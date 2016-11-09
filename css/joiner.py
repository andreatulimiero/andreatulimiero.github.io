import os, sys, time
from os.path import isfile
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

supported_files = ['css']
ignore_files = ['.joinerignore', 'app.min.css']

def should_process_file(filename):
  return filename.split('.')[-1] in supported_files and filename not in ignore_files

def join_files():
  files = [ f for f in os.listdir() if isfile(f) and should_process_file(f)]
  minimized = ''
  for file_name in files:
    with open(file_name) as f:
      minimized += f.read()
  output = open('app.min.css', mode='w+')
  print(minimized, file=output)
  print('Files joined and saved in app.min.css')

class EventHandler(FileSystemEventHandler):
  def on_modified(self, event):
    file_path = event.src_path.replace('\\', '/')
    filename = file_path.split('/')[-1]
    if should_process_file(filename):
      print('Modified ' + filename)
      join_files()
  
  def on_created(self, event):
    file_path = event.src_path.replace('\\', '/')
    filename = file_path.split('/')[-1]
    if should_process_file(filename):
      print('Created ' + filename)
      join_files()

  def on_deleted(self, event):
    file_path = event.src_path.replace('\\', '/')
    filename = file_path.split('/')[-1]
    if should_process_file(filename):
      print('Deleted ' + filename)
      join_files()

if __name__ == '__main__':
  os.chdir(sys.path[0])

  try:
    f = open('.joinerignore')
    for line in f:
      ignore_files.append(line.strip())
  except FileNotFoundError:
    print('Assuming nothing to ignore')
  join_files()

  event_handler = EventHandler()
  observer = Observer()
  observer.schedule(event_handler, path=sys.path[0] + '.', recursive=True)
  observer.start()

  print('Watching for file changes ...')
  try:
    while True:
      time.sleep(1)
  except KeyboardInterrupt:
    print('Stopped watcher')
    observer.stop()
  observer.join()
  