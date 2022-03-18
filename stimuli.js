////////////////
// STIMULI
///////////////

// Item types
const NON_WORD = "NON_WORD";
const RELATED = "RELATED";
const UNRELATED = "UNRELATED";
const PRACTICE = "PRACTICE";
const LISTS = ["list1"];

// In case of more complex design, the above could be, for example:

// const LISTS = [
//     "list1",
//     "list2"
// ];

const PRACTICE_LIST = [
    {
        id: 1, 
        item_type: PRACTICE, 
        word: "palve",
        visual_prime: "onion",
        forward_mask: "#####",
        visual_target: "palve",
        expected_answer: 0
    },
    {
        id: 2, 
        item_type: PRACTICE, 
        word: "hot", 
        visual_prime: "stapler",
        forward_mask: "#######",
        visual_target: "hot",
        expected_answer: 1
    }
];

const LIST_1 = [
    {
        id: 1, 
        item_type: NON_WORD, 
        word: "slirque", 
        visual_prime: "eyes",
        backward_mask: "####",
        auditory_target: "./sounds/slirque.wav",
        expected_answer: 0
    },
    {
        id: 2, 
        item_type: NON_WORD, 
        word: "crawse", 
        visual_prime:  "piano",
        backward_mask: "#####",
        auditory_target: "./sounds/crawse.wav",
        expected_answer: 0
    },
    {
        id: 3, 
        item_type: NON_WORD, 
        word: "thwurp", 
        visual_prime:  "rabbit",
        backward_mask: "######",
        auditory_target: "./sounds/thwurp.wav",
        expected_answer: 0
    },
    {
        id: 4, 
        item_type: NON_WORD, 
        word: "clem", 
        visual_prime:  "flower",
        backward_mask: "######",
        auditory_target: "./sounds/clem.wav",
        expected_answer: 0
    }, 
    {
        id: 5, 
        item_type: RELATED, 
        word: "white", 
        visual_prime:  "snow",
        backward_mask: "####",
        auditory_target: "./sounds/white.wav",
        expected_answer: 1
    },
    {
        id: 6, 
        item_type: RELATED, 
        word: "travel", 
        visual_prime:  "suitcase",
        backward_mask: "########",
        auditory_target: "./sounds/travel.wav",
        expected_answer: 1
    },
    {
        id: 7, 
        item_type: UNRELATED, 
        word: "letter", 
        visual_prime:  "garden",
        backward_mask: "######",
        auditory_target: "./sounds/letter.wav",
        expected_answer: 1
    },
    {
        id: 8, 
        item_type: UNRELATED, 
        word: "clown", 
        visual_prime:  "forest",
        backward_mask: "######",
        auditory_target: "./sounds/clown.wav",
        expected_answer: 1
    }
];

// Add a second list of stimuli when required.
// const LIST_2 = [
// ...
// ]

const TEST_ITEMS = [
    {list_name: LISTS[0], table: LIST_1}
];

// If there were two lists to choose from:

// const TEST_ITEMS = [
//     {list_name: LISTS[0], table: LIST_1},
//     {list_name: LISTS[1], table: LIST_2}
// ];

function getPracticeItems() {
    return {list_name : "practice", table : PRACTICE_LIST};
}

function pickRandomList() {
    let range = function (n) {
        let empty_array = [];
        let i;
        for (i = 0; i < n; i++) {
            empty_array.push(i);
        }
        return empty_array;
    }
    let num_lists = TEST_ITEMS.length;
    let shuffled_range = jsPsych.randomization.repeat(range(num_lists), 1)
    let retlist = TEST_ITEMS[shuffled_range[0]];
    return retlist
}

/**
 * Checks whether a stimulus contains precisely 1 target stimulus
 *
 * @param {object} trial
 *
 * @return {boolean}  true if the trial contains precisely one target.
 */
function containsOneTarget(trial) {
    let sum = 0;
    let has_visual =   typeof trial.visual_target === "string" &&
                       trial.visual_target.length > 0;
    let has_auditory = typeof trial.auditory_target === "string" &&
                       trial.auditory_target.length > 0;
    if (has_visual)
        sum += 1;
    if (has_auditory)
        sum += 1;
    return sum === 1;
}

/**
 * Checks whether the trial doesn't contain more than 1 prime.
 * @param trial
 * @return {boolean}
 */
function containsAtMostOnePrime(trial) {
    let sum = 0;
    let visprime = trial.visual_prime && trial.visual_prime.length > 0;
    let audprime = trial.auditory_prime && trial.auditory_prime.length > 0;
    if (visprime) {
        sum += 1;
    }
    if (audprime) {
        sum += 1;
    }
    return sum <= 1;
}

/**
 * Checks that when a mask is present there is also a visual prime.
 *
 * As it makes no sense to mask a prime that is not presented. And it
 * also makes no sense to visually mask an auditory prime.
 *
 * @param {object} trial
 * @return boolean.
 */
function masksVisualPrime(trial) {
    if ((trial.forward_mask && trial.forward_mask.length > 0) ||
        (trial.backward_mask && trial.backward_mask.length > 0)) {
        if (!trial.visual_prime || trial.visual_prime.length === 0)
            return false;
    }
    return true;
}

/**
 * Validates a list of stimuli.
 *
 * The list_name parameters is mostly used to ease the lookup of an invalid
 * items. The name is used together with the item id to print the violating
 * items.
 *
 * @param {[{}]} trials A list with trial parameters
 * @param {string} list_name The name of the list.
 *
 * @return {boolean} returns true when no errors are found, false otherwise
 */
function validateStimuli(trials, list_name) {
    let success = true;
    trials.forEach((trial) => {

        let stim_string =
            `The stimulus with id "${trial.id}" in list "${list_name} "`;

        if (!containsOneTarget(trial)) {
            console.error(stim_string + "does not contain precisely 1 target.");
            success = false;
        }
        if (!containsAtMostOnePrime(trial)) {
            console.error(stim_string + "does not contain at most 1 prime.");
            success = false;
        }
        if (!masksVisualPrime(trial)) {
            console.error(stim_string + "presents masks while no prime is present.");
            success = false;
        }
    });
    return success;
}

function validateAllStimuli() {
    let success = true;
    if (!validateStimuli(PRACTICE_LIST, "practice items")) {
        success = false;
    }
    for (let i = 0; i < TEST_ITEMS.length; i++) {
        let item = TEST_ITEMS[i];
        if (!validateStimuli(item.table, item.list_name))
            success = false;
    }
    return success;
}

/**
 * Extracts all auditory stimuli from the trials.
 *
 * This function makes it somewhat easy to preload the auditory stimuli
 *
 * @return {string[]}
 */
function getAudioStimuli() {

    let audio_stimuli = [];

    let push_stimulus = function(trial) {
        if (typeof trial.auditory_target === "string") {
            audio_stimuli.push(trial.auditory_target);
        }
        if (typeof trial.auditory_prime === "string") {
            audio_stimuli.push(trial.auditory_prime);
        }
    }
    PRACTICE_LIST.forEach(push_stimulus);
    TEST_ITEMS.forEach((test_item) => {
        let trials = test_item.table;
        trials.forEach(push_stimulus);
    });
    return audio_stimuli;
}
