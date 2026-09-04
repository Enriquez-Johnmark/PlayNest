"""Capture the native Stitch surfaces and verify one locally persisted reservation.
Run against a fresh, dedicated emulator with the release APK installed.
"""
import re
import sys
import subprocess
import time
import xml.etree.ElementTree as ET
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'docs/mobile/verification/stitch'
PACKAGE = 'com.enriquezwend.playnest'

def adb(*args):
    return subprocess.check_output(['adb', *args], timeout=40)

def route(path):
    adb('shell', 'am', 'start', '-a', 'android.intent.action.VIEW', '-d', 'playnest:///' + path.lstrip('/'), PACKAGE)
    time.sleep(2)

def tree():
    adb('shell', 'uiautomator', 'dump', '/sdcard/playnest-qa.xml')
    return adb('shell', 'cat', '/sdcard/playnest-qa.xml').decode()

def wait_for(label):
    for _ in range(5):
        xml = tree()
        if label in xml:
            return xml
        time.sleep(1)
    raise AssertionError('Screen did not become ready: ' + label)

def capture(name):
    xml = tree()
    assert 'Unmatched Route' not in xml and 'ReferenceError' not in xml, name + ': failed to render'
    (OUT / (name + '.xml')).write_text(xml)
    (OUT / (name + '.png')).write_bytes(adb('exec-out', 'screencap', '-p'))
    print('Captured ' + name, flush=True)
    return xml

def tap(label):
    root = ET.fromstring(tree())
    for node in root.iter('node'):
        if label in node.get('text', '') or label in node.get('content-desc', ''):
            x1, y1, x2, y2 = map(int, re.findall(r'\d+', node.attrib['bounds']))
            if x2 > x1 and y2 > y1:
                adb('shell', 'input', 'tap', str((x1 + x2) // 2), str((y1 + y2) // 2))
                time.sleep(2)
                return
    raise RuntimeError('Control not found: ' + label)

OUT.mkdir(parents=True, exist_ok=True)
adb('shell', 'input', 'keyevent', '224')
adb('shell', 'svc', 'power', 'stayon', 'true')
adb('shell', 'wm', 'dismiss-keyguard')
route('/')
wait_for('Good morning')
capture('home')
route('/activities')
capture('activities')
tap('Sensory Play')
xml = capture('activities-filtered')
assert 'Little Explorers: Forest Sensory Lab' in xml
route('/activity/act_forest')
capture('activity-detail')
route('/activity/act_forest/sessions')
capture('child-and-session')
tap('Confirm & Reserve')
wait_for('Complete Reservation')
capture('review')
if '--capture-existing' not in sys.argv:
    tap('Complete Reservation')
    wait_for('Booked for Play')
    xml = capture('confirmation')
    assert 'Booked for Play' in xml
route('/bookings')
xml = capture('bookings')
references = re.findall(r'#(PN-[A-Z0-9]+)', xml)
assert references and references[0] != 'PN-84920', 'New reservation should appear before the sample pass'
new_reference = references[0]
new_booking_id = 'bkg_demo_' + str(int(new_reference[3:], 36))
adb('shell', 'am', 'force-stop', PACKAGE)
route('/bookings')
assert new_reference in wait_for(new_reference), 'Reservation should survive a full app restart'
if '--capture-existing' in sys.argv:
    route('/booking/' + new_booking_id + '/confirmation')
    wait_for('Booked for Play')
    capture('confirmation')
route('/booking/' + new_booking_id + '/pass')
capture('check-in-pass')
route('/profile')
capture('profile')
print('PASS: native screens, filters, confirmed pass and restart persistence' if '--capture-existing' in sys.argv else 'PASS: filters, reservation, confirmation, pass and restart persistence', flush=True)
