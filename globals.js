// Default behavior of (sub) trial phases.
const FIXCROSS_DURATION = 1000;
const INTERTRIAL_INTERVAL = 1000;

const PRIME_MASK_DURATION = 100; 
const PRIME_DURATION = 500;

const RESPONSE_TIMEOUT_DURATION = 2000; //auto, inluding audio playback duration?
const FEEDBACK_DURATION = 1000;

const PRIME_GAP_DURATION = 300;

//const TRIAL_GAP_DURATION = 1000; -- ITI?

// How many items of the same type may appear in series in case of pseudorandomisation
const MAX_SUCCEEDING_ITEMS_OF_TYPE = 2;

// Defaults for buttons
const OK_BUTTON_TEXT = "OK";
const YES_OR_NO_BUTTON_TEXT = ["Yes", "No"];

// ACCESS_KEY needs to be used for server setup (data store)
const ACCESS_KEY = 'zeeekretkeey'; 

// Deafult restrictions of minimal browser dimensions
const MIN_WIDTH = 800;
const MIN_HEIGHT = 600;

// GENERIC TESTS/CHECKS
const GENERIC_CHECK = `
    <h3>In order to participate, please make sure that you:</h3>
    <BR>
    <ul>
    <li>Run this on a Laptop or Desktop computer, <b>not</b> on a phone or a tablet!</li>
    <li>Have a <b>real keyboard</b> working.</li><li>Have a <b>mouse</b> and/or 
    <b>trackpad</b> that works.</li>
    <li>Have your browser's audio enabled and your volume on.</li>
    </ul>
    <h3>Please <i>maximize</i> your browser window before you continue!</h3>
    <BR>
    <p>Click below if you are ready to proceed</p>
    `;
    
const PREPARE_FOR_SURVEY = `
    Please answer some screening questions in a quick (forced choice) survey.
    `;

// survey multiple choice block
const BILINGUAL_QUESTION = `
    Were you born and raised in a  
    <a href="https://en.wikipedia.org/wiki/Multilingualism" target="_blank">multilingual</a>
    environment?
    `;
const BILINGUAL_OPTIONS = ["No","Yes"];

const DYSLEXIC_QUESTION = `Are you 
    <a href="https://en.wikipedia.org/wiki/Dyslexia" target="_blank">dyslexic</a>?
    `;
const DYSLEXIC_OPTIONS = ["No", "Yes"];

const SEX_QUESTION = `
    What is your
    <a href="https://en.wikipedia.org/wiki/Sex" target="_blank">biological sex</a>?
    `;
const SEX_OPTIONS = ["Female", "Male", "Other", "Prefer not to say"];

const HAND_QUESTION = 'Which hand do you prefer to write with?';
const HAND_OPTIONS = ["Left", "Right"];

// Keyboard choices
const KEYBOARD_CHOICES = ['QWERTY','AZERTY','DVORAK','QWERTZ','CUSTOM'];

// simple layout for left/right keys given some known layouts:
// Type     |   Left  |   Right
// ---------|---------|----------
// QWERTY   |   A     |  L
// AZERTY   |   Q     |  M
// DVORAK   |   A     |  S (or N?)
// QWERTZ   |   A     |  L
// OTHER    |   A     |  L (fallback, more tries?)

const QWERTY = { kb_type: 'QUERTY', left_key: "A", right_key: "L" };
const AZERTY = { kb_type: 'AZERTY', left_key: "Q", right_key: "M" };
const DVORAK = { kb_type: 'DVORAK', left_key: "A", right_key: "S" };
const QWERTZ = { kb_type: 'QWERTZ', left_key: "A", right_key: "L" };
const CUSTOM = { kb_type: 'CUSTOM', left_key: "1", right_key: "0" };

// Quick lookup table
const KEYBOARD_DEFAULTS = {
    'QWERTY': QWERTY,
    'AZERTY': AZERTY,
    'DVORAK': DVORAK,
    'QWERTZ': QWERTZ,
    'CUSTOM': CUSTOM,
};

// audio testing
//const AUDIO_PATH = './sounds/';

const AUDIO_CHECK_PROMPT_TEXT_LOOP = `
    You can play the test sound again 
    (and adjust the audio level for your headpones). 
    If you're comfortable, click 'continue'...
    `

const DEBRIEF_MESSAGE = `
    <h1>End of the experiment</h1><BR><BR>
    <h2>Thank you for participating!</h2>
    `;

const DEBRIEF_MESSAGE_DURATION = 3000;

