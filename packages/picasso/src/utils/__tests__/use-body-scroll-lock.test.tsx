import { renderHook } from '@testing-library/react-hooks';

import { useBodyScrollLock } from '../use-body-scroll-lock';

let defaultBodyOverflow: string;

describe('useBodyScrollLock', () => {

  beforeEach(() => {
    defaultBodyOverflow = document.body.style.overflow;
  })

  afterEach(() => {
    document.body.style.overflow = defaultBodyOverflow;
  })

  describe('single usage', () => {
    it('drops scroll lock when mounted with true', () => {      
      renderHook(() => useBodyScrollLock(true));

      expect(document.body.style.overflow).toBe('hidden');
    })

    describe('lifts scroll lock', () => {
      it('when unmounted', () => {        
        const {unmount} = renderHook(() => useBodyScrollLock(true));
  
        expect(document.body.style.overflow).toBe('hidden');
  
        unmount()
  
        expect(document.body.style.overflow).toBe('');
      })

      it('when isLocked switches into false', () => {  
        const {rerender} = renderHook((isLocked) => useBodyScrollLock(isLocked), { initialProps: true });
  
        expect(document.body.style.overflow).toBe('hidden');
  
        rerender(false)
  
        expect(document.body.style.overflow).toBe('');
      })

      it('restores prev body overflow', () => {
        document.body.style.overflow = 'grid';

        const {unmount} = renderHook(() => useBodyScrollLock(true));
  
        expect(document.body.style.overflow).toBe('hidden');
  
        unmount()
  
        expect(document.body.style.overflow).toBe('grid');
      })
    })    
  })

  describe('multiple instances usage', () => {
    it('drops scroll lock once any hook gets isLocked=true', () => {
      const hook1 = renderHook((isLocked) => useBodyScrollLock(isLocked), { initialProps: false });
      const hook2 = renderHook((isLocked) => useBodyScrollLock(isLocked), { initialProps: false });
      const hook3 = renderHook((isLocked) => useBodyScrollLock(isLocked), { initialProps: false });  
    
      expect(document.body.style.overflow).toBe('');

      hook1.rerender(true)

      expect(document.body.style.overflow).toBe('hidden');

      hook2.rerender(true)
      hook3.rerender(true)

      expect(document.body.style.overflow).toBe('hidden');
    })

    it('lifts scroll lock once no hook with isLocked=true left mounted', () => {
      document.body.style.overflow = 'block';
      
      const hook1 = renderHook((isLocked) => useBodyScrollLock(isLocked), { initialProps: true });
      const hook2 = renderHook((isLocked) => useBodyScrollLock(isLocked), { initialProps: true });
      const hook3 = renderHook((isLocked) => useBodyScrollLock(isLocked), { initialProps: true });  
    
      expect(document.body.style.overflow).toBe('hidden');
      
      hook3.unmount()

      expect(document.body.style.overflow).toBe('hidden');

      hook2.rerender(false)

      expect(document.body.style.overflow).toBe('hidden');

      hook1.rerender(false)

      expect(document.body.style.overflow).toBe('block');
    })
    
  })
})
