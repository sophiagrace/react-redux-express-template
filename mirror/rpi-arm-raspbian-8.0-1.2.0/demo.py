import snowboydecoder
import sys
import signal
import subprocess
print("moose");
interrupted = False

def signal_handler(signal, frame):
    global interrupted
    interrupted = True

def interrupt_callback():
    global interrupted
    return interrupted

def asif():
    print("yes come on")    

'''if len(sys.argv) == 1:
    print("Error: need to specify model name")
    print("Usage: python demo.py your.model")
    sys.exit(-1)'''

model = "/home/pi/Public/mirror/rpi-arm-raspbian-8.0-1.2.0/resources/snowboy.umdl"

signal.signal(signal.SIGINT, signal_handler)

detector = snowboydecoder.HotwordDetector(model, sensitivity=0.5)
print('Listening... Press Ctrl+C to exit')

detector.start(detected_callback=asif,
               interrupt_check=interrupt_callback,
               sleep_time=0.03)

detector.terminate()
