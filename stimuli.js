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

const PRACTICE_ITEMS = [
    {
        id: 1, 
        item_type: PRACTICE, 
        word: "palve",
        visual_prime: "onion",
        backward_mask: "#####",
        visual_target: "palve",
        expected_answer: 0
    },
    {
        id: 2, 
        item_type: PRACTICE, 
        word: "hot", 
        visual_prime: "stapler",
        backward_mask: "#######",
        visual_target: "hot",
        expected_answer: 1
    }
];

const LIST_1 = [
    {
        id: 1, 
        item_type: NON_WORD, 
        word: "slirque", 
        auditory_target: "./sounds/slirque.wav",
        visual_prime: "eyes",
        backward_mask: "####",
        expected_answer: 0
    },
    {
        id: 2, 
        item_type: NON_WORD, 
        word: "crawse", 
        auditory_target: "./sounds/crawse.wav",
        visual_prime:  "piano",
        backward_mask: "#####",
        expected_answer: 0
    },
    {
        id: 3, 
        item_type: NON_WORD, 
        word: "thwurp", 
        auditory_target: "./sounds/thwurp.wav",
        visual_prime:  "rabbit",
        backward_mask: "######",
        expected_answer: 0
    },
    {
        id: 4, 
        item_type: NON_WORD, 
        word: "clem", 
        auditory_target: "./sounds/clem.wav",
        visual_prime:  "flower",
        backward_mask: "######",
        expected_answer: 0
    }, 
    {
        id: 5, 
        item_type: RELATED, 
        word: "white", 
        auditory_target: "./sounds/white.wav",
        visual_prime:  "snow",
        backward_mask: "####",
        expected_answer: 1
    },
    {
        id: 6, 
        item_type: RELATED, 
        word: "travel", 
        auditory_target: "./sounds/travel.wav",
        visual_prime:  "suitcase",
        backward_mask: "########",
        expected_answer: 1
    },
    {
        id: 7, 
        item_type: UNRELATED, 
        word: "letter", 
        auditory_target: "./sounds/letter.wav",
        visual_prime:  "garden",
        backward_mask: "######",
        expected_answer: 1
    },
    {
        id: 8, 
        item_type: UNRELATED, 
        word: "clown", 
        auditory_target: "./sounds/clown.wav",
        visual_prime:  "forest",
        backward_mask: "######",
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
    return {list_name : "practice", table : PRACTICE_ITEMS};
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

