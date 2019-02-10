#!/bin/sh
npm run build
rm -rf ../../osa3/puhlbackend/build
cp -r build ../../osa3/puhlbackend/
