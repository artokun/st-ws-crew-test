# calls flatc --ts in schema directory and copies the output to both server and src directories
# this script is called by npm run generate-fbb

# generate flatbuffers schema
flatc --gen-object-api -o src/ --ts schema/*.fbs
flatc --gen-object-api -o server/ --ts schema/*.fbs