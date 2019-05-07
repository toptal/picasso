
for /f "delims=" %%a in ('node -p "require('./package.json').version"') do @set PKG_VERSION=%%a
SET PKG_VERSION=%PKG_VERSION: =%

SET PICASSO_IMAGE=gcr.io/compute-engine-1069/picasso:latest

SET PWD=%cd%
mkdir build
mkdir __diff_output__

docker run -t -i --rm^
 -v %PWD%/package.json:/app/package.json^
 -v %PWD%/yarn.lock:/app/yarn.lock^
 -v %PWD%/src:/app/src^
 -v %PWD%/build:/app/build^
 -v %PWD%/.storybook:/app/.storybook^
 -v %PWD%/__diff_output__:/app/__diff_output__^
 -e NPM_TOKEN=$NPM_TOKEN^
 %PICASSO_IMAGE% %*"
 