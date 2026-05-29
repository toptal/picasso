import struct, zlib
def read_png(p):
    with open(p,'rb') as f: d=f.read()
    assert d[:8]==b'\x89PNG\r\n\x1a\n'
    pos=8; W=H=bd=ct=None; idat=b''
    while pos<len(d):
        ln=struct.unpack('>I',d[pos:pos+4])[0]; typ=d[pos+4:pos+8]; data=d[pos+8:pos+8+ln]; pos+=12+ln
        if typ==b'IHDR': W,H,bd,ct=struct.unpack('>IIBB',data[:10])
        elif typ==b'IDAT': idat+=data
        elif typ==b'IEND': break
    raw=zlib.decompress(idat); ch={0:1,2:3,3:1,4:2,6:4}[ct]; bpp=ch*(bd//8); stride=W*bpp
    out=bytearray(); prev=bytearray(stride); i=0
    def paeth(a,b,c):
        p=a+b-c; pa=abs(p-a);pb=abs(p-b);pc=abs(p-c)
        return a if pa<=pb and pa<=pc else (b if pb<=pc else c)
    for y in range(H):
        ft=raw[i]; i+=1; line=bytearray(raw[i:i+stride]); i+=stride
        if ft==1:
            for x in range(bpp,stride): line[x]=(line[x]+line[x-bpp])&255
        elif ft==2:
            for x in range(stride): line[x]=(line[x]+prev[x])&255
        elif ft==3:
            for x in range(stride):
                a=line[x-bpp] if x>=bpp else 0; line[x]=(line[x]+((a+prev[x])>>1))&255
        elif ft==4:
            for x in range(stride):
                a=line[x-bpp] if x>=bpp else 0; c=prev[x-bpp] if x>=bpp else 0
                line[x]=(line[x]+paeth(a,prev[x],c))&255
        out+=line; prev=line
    return W,H,ch,bytes(out)
def diff(o,n):
    W,H,ch,a=read_png(o); W2,H2,ch2,b=read_png(n)
    if (W,H)!=(W2,H2): return f"SIZE DIFF old={W}x{H} new={W2}x{H2}"
    minx=miny=10**9; maxx=maxy=-1; cnt=0; maxd=0
    for y in range(H):
        row=y*W
        for x in range(W):
            idx=(row+x)*ch; d=0
            for c in range(min(3,ch)):
                dd=abs(a[idx+c]-b[idx+c])
                if dd>d: d=dd
            if d>16:
                cnt+=1
                if d>maxd: maxd=d
                if x<minx:minx=x
                if x>maxx:maxx=x
                if y<miny:miny=y
                if y>maxy:maxy=y
    if cnt==0: return f"{W}x{H}: NO diff>16"
    return f"{W}x{H}: diffpx={cnt} maxd={maxd} bbox=({minx},{miny})-({maxx},{maxy}) size={maxx-minx+1}x{maxy-miny+1}"
base="/Users/vivanac/Projects/picasso/migration-runs/2026-05-18/Switch-v1/happo-diffs/iter-1-storybook"
for f in ["06-switch-controlled-chrome-desktop","07-switch-disabled-chrome-desktop","08-switch-uncontrolled-chrome-desktop","01-form-horizontal-chrome-desktop"]:
    print(f, "->", diff(f"{base}/{f}.old.png", f"{base}/{f}.new.png"))
