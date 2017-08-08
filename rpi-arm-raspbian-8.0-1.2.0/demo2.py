import snowboydecoder
import sys
import signal
print("corey")

# Demo code for listening two hotwords at the same time

interrupted = False


def signal_handler(signal, frame):
    global interrupted
    interrupted = True


def interrupt_callback():
    global interrupted
    return interrupted

def wakeup():
    print("wakeup")

def sleep():
    print("sleep")

models = ["/home/pi/Public/web-smart-mirror/rpi-arm-raspbian-8.0-1.2.0/resources/wakeup.pmdl",
             "/home/pi/Public/web-smart-mirror/rpi-arm-raspbian-8.0-1.2.0/resources/sleep.pmdl"]

# capture SIGINT signal, e.g., Ctrl+C
signal.signal(signal.SIGINT, signal_handler)

sensitivity = [0.5]*len(models)
detector = snowboydecoder.HotwordDetector(models, sensitivity=sensitivity)
callbacks = [wakeup, sleep]
print('Listening... Press Ctrl+C to exit')

# main loop
# make sure you have the same numbers of callbacks and models
detector.start(detected_callback=callbacks,
               interrupt_check=interrupt_callback,
               sleep_time=0.03)

detector.terminate()
