document.addEventListener('DOMContentLoaded', function() {
    const pianoNotes = {
        'C4': {
            url: 'https://raw.githubusercontent.com/ademayy/Assignment-2/main/sounds/c6-102822.mp3',
            keyboardKey: 'z'
        },
        
        'D4': {
            url: 'https://github.com/ademayy/Assignment-2/raw/main/sounds/d6-82020.mp3',
            keyboardKey: 'x'
        },
        'D#4': {
            url: 'https://raw.githubusercontent.com/ademayy/Assignment-2/main/sounds/d6-82018.mp3',
            keyboardKey: 'd'
        },
        'E4': {
            url: 'https://raw.githubusercontent.com/ademayy/Assignment-2/main/sounds/e6-82016.mp3', 
            keyboardKey: 'c'
        },
        'F4': {
            url: 'https://raw.githubusercontent.com/ademayy/Assignment-2/main/sounds/f6-102819.mp3',
            keyboardKey: 'v'
        },
        'G4': {
            url: 'https://raw.githubusercontent.com/ademayy/Assignment-2/main/sounds/g6-82013.mp3', 
            keyboardKey: 'b'
        },
        'G#4': {
            url: 'https://raw.githubusercontent.com/ademayy/Assignment-2/main/sounds/g6-82014.mp3', 
            keyboardKey: 'h'
        },
        'A4': {
            url: 'https://raw.githubusercontent.com/ademayy/Assignment-2/main/sounds/a6-102820.mp3', 
            keyboardKey: 'n'
        },
        'A#4': {
            url: 'https://github.com/ademayy/Assignment-2/raw/main/sounds/a6-82015.mp3',
            keyboardKey: 'j'
        },
        'B4': {
            url: 'https://raw.githubusercontent.com/ademayy/Assignment-2/main/sounds/b6-82017.mp3', 
            keyboardKey: 'm'
        },
        'C5': {
            url: 'https://raw.githubusercontent.com/ademayy/Assignment-2/main/sounds/c6-102822.mp3',
            keyboardKey: ','
        }
    };

    const keyMap = {};
    for (const note in pianoNotes) {
        keyMap[pianoNotes[note].keyboardKey] = note;
    }

    const sounds = {};
    for (const note in pianoNotes) {
        sounds[note] = new Howl({
            src: [pianoNotes[note].url],
            volume: 0.5,
            preload: true
        });
    }

    const keys = document.querySelectorAll('.key');

    keys.forEach(key => {
        const note = key.getAttribute('data-note');
        if (note) {
            key.addEventListener('click', () => playNote(note, key));
            key.addEventListener('mousedown', () => key.classList.add('active'));
            key.addEventListener('mouseup', () => key.classList.remove('active'));
            key.addEventListener('mouseleave', () => key.classList.remove('active'));
        }
    });

    document.addEventListener('keydown', event => {
        const key = event.key.toLowerCase();
        if (keyMap[key] && !event.repeat) {
            const note = keyMap[key];
            const keyElement = document.querySelector(`.key[data-note="${note}"]`);
            if (keyElement) {
                playNote(note, keyElement);
                keyElement.classList.add('active');
            }
        }
    });

    document.addEventListener('keyup', event => {
        const key = event.key.toLowerCase();
        if (keyMap[key]) {
            const note = keyMap[key];
            const keyElement = document.querySelector(`.key[data-note="${note}"]`);
            if (keyElement) {
                keyElement.classList.remove('active');
            }
        }
    });

    function playNote(note, keyElement) {
        if (sounds[note]) {
            sounds[note].play();
            keyElement.classList.add('active');
            setTimeout(() => {
                keyElement.classList.remove('active');
            }, 300);
        }
    }

    window.updateNoteUrl = function(note, newUrl) {
        if (pianoNotes[note]) {
            pianoNotes[note].url = newUrl;
            sounds[note] = new Howl({
                src: [newUrl],
                volume: 0.5,
                preload: true
            });
            console.log(`Updated ${note} to use: ${newUrl}`);
            return true;
        }
        return false;
    };
});