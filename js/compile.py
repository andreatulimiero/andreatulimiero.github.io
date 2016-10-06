import requests, sys

def get_minified_js():
  minified_js = ''
  try:
    print('Grabbing _to_compile.csv ...\n')
    _to_compile = open('_to_compile.csv')
    for filename in _to_compile.read().split(','):
      try:
        print('|-' + filename)
        file = open(filename.strip())
        minified_js += file.read()
      except FileNotFoundError:
        print('No file named ' + filename)
  except FileNotFoundError:
    print('No _to_compile.csv file specified')
  return minified_js

if __name__ == '__main__':
  compilation_level = 'WHITESPACE_ONLY'
  output_format = 'text'
  data = {
    'js_code' : get_minified_js(),
    'compilation_level' : compilation_level,
    'output_format' : output_format,
    'output_info' : 'compiled_code'
  }
  headers = {'Content-type': 'application/x-www-form-urlencoded'}
  print('\nCompiling ...')
  r = requests.post('http://closure-compiler.appspot.com/compile', headers=headers, data=data)
  if r.status_code in range(200, 300):
    f = open('app.min.js', mode='w+')
    print(r.text, file=f)
    print('Compilation saved in app.min.js')
  else:
    print('Compilation error')
    