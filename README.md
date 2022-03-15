# jspsych-lexical-decision
[Lexical Decision](https://en.wikipedia.org/wiki/Lexical_decision_task)
This boilerplate experiment is designed to run multiple kinds of lexical
decision. The lexical descision may be based on an auditory or visual
stimulus. The target word may be preceded by an optionally masked prime.
This experiment is based on the previous experiments of the Uil-OTS labs:

- **jspsych-vislexdec**       lexical decision (visual target stimulus)
- **jspsych-vislexdec-vp**    lexical decision (visual target stimulus) + visual prime
- **jspsych-vislexdec-vp-vm** lexcial decision (visual target stimulus) + visual masked prime
- **jspsych-audlexdec**       lexical decision (auditory target stimulus)
- **jspsych-audlexdec-ap**    lexical decision (auditory target stimulus) + auditory prime
- **jspsych-audlexdec-vp**    lexical decision (auditory target stimulus) + visual prime
- **jspsych-audlexdec-vp-vm** lexical decision (auditory target stimulus) + visual masked prime

however, it is one experiment capable of running all subflavors above. The list
of stimuli will determine what subflavor will presentented to the subjects of this
experiment.

# Generic documentation
Please read the [generic documentation](https://github.com/UiL-OTS-labs/jspsych-uil-template-docs)
for some context and scope.

# Task Description
Auditory or visual lexcial decision task: the participant first sees a fixation
cross, this marks the onset of an trial. Then optionally an auditory or visual
prime is presented. The visual prime may be subsequently masked. Finally the
participants hear or see a real or non existing word (non-word). The task is
to respond as quickly as possible and indicate wether the heard word is a real
word or not.

Crucial trial phases (sub trial phases):
- Fixation cross 
- (optional) Visual Forward Mask ('#####')
- (optional) Visual or auditory Prime
- (optional) Visual Backward Mask
- Target visual or auditory stimulus (Decision phase)

### Reference:
    Rubenstein, H., Garfield, L., & Millikan, J.A. (1970).
    Homographic entries in the internal lexicon.
    Journal of Verbal Learning and Verbal Behavior, 9, 487≠494.

# Output

The data of _all_ (sub) _trial phases_ are logged in the data, but the output
 data can be filtered after data collection in many ways.
Please read the
[general primer on jsPsych's data](https://github.com/UiL-OTS-labs/jspsych-output)
if you are new to jsPsych data output.

Essential output for the _'true experimental'_ purpose in this template are:

- Reaction Time (RT) of the keyboard response in the decision phase
- Correctness of the keyboard response in the decision phase

The crucial trial/sub-trial phase (decision phase) output may look similar to this:

```json
{
    "rt": 583,
    "stimulus": "./sounds/white.wav",
    "key_press": 65,
    "condition": "RELATED",
    "word": "white",
    "word_file": "./sounds/white.wav",
    "prime": "snow",
    "prime_mask": "####",
    "id": 5,
    "trial_phase": "present_word",
    "useful_data_flag": true,
    "correct_response": 1,
    "trial_type": "audio-keyboard-response",
    "trial_index": 26,
    "time_elapsed": 46171,
    "internal_node_id": "0.0-12.0-3.0",
    "subject": "kd9tsn3y",
    "list": "my_one_and_only_list",
    "correct": true,
    "integer_correct": 1,
    "key_chosen_ascii": 65,
    "key_chosen_char": "A",
    "yes_key": "A",
    "no_key": "L"
}
```
Variable name (key) | Description          | Unit  | Type           | Comments                             | jsPsych default | Template default | Plugin name
--------------------|----------------------|-------|----------------|--------------------------------------|-----------------|------------------|------------
"rt"                | Reaction Time        | ms.   | float          | Reaction time in milliseconds        | yes             |                  |
"stimulus"          | stimulus (html)      |       | string/html    | Path to audio file                   | yes             |                  |
"key_press"         | Keyboard response    |       | string/object? | https://en.wikipedia.org/wiki/ASCII  | yes             |                  | audio-keyboard-response
"condition"         | Condition            |       | string         | See ```stimuli.js```                 | no              | yes              |
"word"              | Decision phase item  |       | string/html    | See ```stimuli.js, index.html```     | no              | yes              |
"word_file"         | Decision phase item  |       | string         | Path to audio file (reflects 'word') | no              | yes              |
"prime"             | Prime phase item     |       | string/html    | (...)                                | no              | yes              |
"prime_mask"        | Mask item            |       | string/html    | (...)                                | no              | yes              |
"id"                | ID/code              |       |                | (...)                                | yes             |                  |
"trial_phase"       | Trial phase          |       |                | (...)                                | no              | yes              |
"useful_data_flag"  | Filter flag          |       | boolean        |                                      | no              | yes              |
_"expected_answer"_ | TODO change!         |       | todo           | Now (still) named "correct_response" | no              | no/yes/will be   |
"trial_type"        | What plugin was used |       |                |                                      | yes             |                  | "audio-keyboard-response"
"trial_index"       | jsPsych index        |       |                |                            	       | yes             |                  |
"time_elapsed".     | jsPsych time object  | ms    | int (/float?)  | For instance: 45062                  | yes             |                  |
"internal_node_id.  | jsPsych node object  |       |                | For instance:"0.0-11.0-1.4"          | yes             |                  |
"subject"           | Subject ID           |       |                | For instance: "8oo722dq"             |                 | yes              |
"list"              | Stimulus list name.  |       | string         | For instance: "my_one_and_only_list" | no              | yes              |
"correct"           | Scoring result       |       | Boolean        | 'true or false' score of response    |                 | yes              |
"integer_correct"   | Scoring result       |       | integer        | 1 or 0 for correct or incorrect      |                 | yes              |
"key_chosen_ascii"  |                      |       |                | For instance: 65                     | no              | yes              |
"key_chosen_char"   |                      |       |                | For instance: "A"                    | no              | yes              |
"yes_key"           |                      |       |                | For instance:  "A"                   | no              | yes              |
"no_key"            |                      |       |                | For instance: "L"                    | no              | yes              |



# Getting started
People _affiliated with our lab_ can use the information
[from our lab webiste](https://uilots-labs.wp.hum.uu.nl/experiments/overview/)
and expand the "Online experiments using jsPsych" section for details. Please
follow [this how-to](https://uilots-labs.wp.hum.uu.nl/how-to/online-experimenting/).

## Make your experiment ready for use with the data server

### Update access key
In the file `globals.js` is a variable:
```javascript
const ACCESS_KEY = '00000000-0000-0000-0000-000000000000';
```
Before uploading your experimentto the UiL-OTS data server, you will need to
change this to the access_key that you obtained when your experiment was
approved. For elaborate info see `globals.js`.

### Adapting stimuli
- Open the file `stimuli.js` in your plain text editor.
- There is a list, called LIST_1:

  ```javacript
  const LIST_1 = [ // stimuli and timeline variables
  ```
  For a more elaborate example see the Adding stimuli section below.
- This list can be adapted to your own needs, i.e, you can replace values,
  make the list longer (don't forget to increment the 'id' values for new items!).
- If you need to implement a more complex design, you should read the
  `stimuli.js` file (and its comment sections) a little better.
- For an example of a Latin square design, please have a look
  [here](https://github.com/UiL-OTS-labs/jspsych-spr-mw).

### Adding stimuli

In the file stimuli.js, one needs to add stimuli to one or multiple lists.
One full description of one trial looks like this:
```javascript
const LIST_1 = [
    {
        // We recommend always to use these first tree items.
        id: 1,                      // Always use incrementing id's e.g 1, 2, etc.
        item_type: RELATED,         // Always denote the item_type/condition.
        word: "palve",              // Always show which word is being presented
                                    //  as target.
        expected_answer: 0,         // 0 when word is a NONword, 1 if it IS a word.

        // The next items are optional, you may leave them empty "", null, undefined
        // or simply omit them if you don't use them, leaving them out is the
        // preferred method.

        // A visual mask presented prior to the prime. You are free to omit it, then
        // no forward prime will be presented.
        forward_mask: "#####",

        // primes Optional you are free to omit both of them.
        visual_prime : "prime",     // A word presented on the screen as prime

        // an auditory prime make sure the file exists.
        auditory_prime : "./sounds/prime.wav",

        // Similar to the forward mask, only enter it in the stimuli when needed.
        backward_mask : "#####",

        // The target stimuli, you should use precisely one of the two options below.

        // A sound file containing the target word
        auditory_target : "./sounds/palve.wav",

        // A word that will be displayed on screen.
        visual_target : "palve"
    }
]
```
The example above shows all options, in order to demonstrate what you would add
to the stimuli. However, consider what would happen when you provide both a
auditory and a visual target word. The experiment has to present them both
and that won't be very handy. So in a very simple visual lexical decision
without priming you can simplify the description of the stimulus list to:
```javascript
const LIST_1 = [
    {
        id: 1,
        item_type: RELATED,
        word: "palve",
        expected_answer: 0,
        visual_target : "palve"
    }
]
```
So this is not so long as one might be scared of ;-).
Good luck, happy experimenting!
