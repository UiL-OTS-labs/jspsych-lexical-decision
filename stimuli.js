////////////////
// STIMULI
///////////////

// Item types
const NON_WORD = "NON_WORD";
const RELATED = "RELATED";
const UNRELATED = "UNRELATED";
const PRACTICE = "PRACTICE";
const LISTS = ["my_one_and_only_list"];

// In case of more complex design, the above could be, for example:

// const LISTS = [
//     "my_first_list",
//     "my_second_list"
// ];

const PRACTICE_ITEMS = [
    {
        id: 1, 
        item_type: PRACTICE, 
        word: "palve", 
        wordfn: "./sounds/palve.wav",
        prime: "onion",
        pmask: "#####",
        expected_answer: 0
    },
    {
        id: 2, 
        item_type: PRACTICE, 
        word: "hot", 
        wordfn: "./sounds/hot.wav",
        prime: "stapler",
        pmask: "#######",
        expected_answer: 1
    }
];

const LIST_1 = [
    {
        id: 1, 
        item_type: NON_WORD, 
        word: "slirque", 
        wordfn: "./sounds/slirque.wav",
        prime: "eyes",
        pmask: "####",
        expected_answer: 0
    },
    {
        id: 2, 
        item_type: NON_WORD, 
        word: "crawse", 
        wordfn: "./sounds/crawse.wav",
        prime: "piano",
        pmask: "#####",
        expected_answer: 0
    },
    {
        id: 3, 
        item_type: NON_WORD, 
        word: "thwurp", 
        wordfn: "./sounds/thwurp.wav",
        prime: "rabbit",
        pmask: "######",
        expected_answer: 0
    },
    {
        id: 4, 
        item_type: NON_WORD, 
        word: "clem", 
        wordfn: "./sounds/clem.wav",
        prime: "flower",
        pmask: "######",
        expected_answer: 0
    }, 
    {
        id: 5, 
        item_type: RELATED, 
        word: "white", 
        wordfn: "./sounds/white.wav",
        prime: "snow",
        pmask: "####",
        expected_answer: 1
    },
    {
        id: 6, 
        item_type: RELATED, 
        word: "travel", 
        wordfn: "./sounds/travel.wav",
        prime: "suitcase",
        pmask: "########",
        expected_answer: 1
    },
    {
        id: 7, 
        item_type: UNRELATED, 
        word: "letter", 
        wordfn: "./sounds/letter.wav",
        prime: "garden",
        pmask: "######",
        expected_answer: 1
    },
    {
        id: 8, 
        item_type: UNRELATED, 
        word: "clown", 
        wordfn: "./sounds/clown.wav",
        prime: "forest",
        pmask: "######",
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
    var shuffled_range = jsPsych.randomization.repeat(range(num_lists), 1)
    var retlist = TEST_ITEMS[shuffled_range[0]];
    return retlist
}

