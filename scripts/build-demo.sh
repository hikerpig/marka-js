#!/bin/bash
# Build demo page for github pages

npm run build

demo_dir='docs'

mkdir $demo_dir || echo 'demo-dist existed'
cp -r dist $demo_dir/
cp README.md $demo_dir/
cp -r demo/* $demo_dir/
