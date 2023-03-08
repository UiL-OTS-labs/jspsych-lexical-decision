# jspsych-lexical-decision
This boilerplate [lexical decision](https://en.wikipedia.org/wiki/Lexical_decision_task)
experiment is designed to run multiple flavors of lexical
decision. The lexical decision may be based on an auditory or visual
stimulus. The target word may be preceded by an optionally masked prime.
This experiment is based on the previous experiments of the ILS labs:

- **jspsych-vislexdec**       lexical decision (visual target stimulus)
- **jspsych-vislexdec-vp**    lexical decision (visual target stimulus) + visual prime
- **jspsych-vislexdec-vp-vm** lexical decision (visual target stimulus) + visual masked prime
- **jspsych-audlexdec**       lexical decision (auditory target stimulus)
- **jspsych-audlexdec-ap**    lexical decision (auditory target stimulus) + auditory prime
- **jspsych-audlexdec-vp**    lexical decision (auditory target stimulus) + visual prime
- **jspsych-audlexdec-vp-vm** lexical decision (auditory target stimulus) + visual masked prime

However, it is one experiment capable of running all sub flavors above. The list
of stimuli will determine what sub flavor will be presented to the subjects of
this experiment.

# Generic documentation
Please read the [generic documentation](https://github.com/UiL-OTS-labs/jspsych-uil-template-docs)
for some context and scope.

# Task Description
Auditory or visual lexical decision task: the participant first sees a fixation
cross, this marks the onset of a trial. Then optionally an auditory or visual
prime is presented. The visual prime may be subsequently masked. Finally, the
participants hear or see a real or non-existing word (non-word). The task is
to respond as quickly as possible and indicate whether the heard word is a real
word or not.

Crucial trial phases (sub trial phases):
- Fixation cross 
- (optional) Visual Forward Mask ('#####')
- (optional) Visual or auditory Prime
- (optional) Visual Backward Mask
- Target visual or auditory stimulus (Decision phase)

This boilerplate is a short example, and primarily intended to illustrate how
this experiment works. So for the practice phase you see a lexical decision
with a forward mask and a visual prime, and the target word is also presented
on screen. In contrast, in the test phase, there is a backward mask and the
target is presented as a sound. You could interleave all different flavors if
you would want to, however, we strongly suggest making one type of trial for all
practice and test stimuli.

# Getting started
People _affiliated with ILS labs_ can use the information
[from our lab webiste](https://ils-labs.wp.hum.uu.nl/experiments/overview/)
and expand the "Online experiments using jsPsych" section for details. Please
follow [this how-to](https://ils-labs.wp.hum.uu.nl/how-to/online-experimenting/).

## Make your experiment ready for use with the data server
### Update access key
The file `globals.js` contains a variable:
```javascript
const ACCESS_KEY = '00000000-0000-0000-0000-000000000000';
```
Before uploading your experiment to the ILS data server, you will need to
change this to the access key that you obtained when your experiment was
approved. For elaborate info see `globals.js`.

## Adapting stimuli
- Open the file `stimuli.js` in your plain text editor.
- There is a list, called `LIST_1`:

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
So this is not as long as one might fear ;-).

## In case of using auditory stimuli as prime or target word
The boilerplate experiment contains a *soundtest* stimulus. This sound test is done
in order for the participant to adjust their sound settings to a comfortable
sound level. This ensures stimuli are not presented too loud or
too soft. This "test" is skipped when your stimulus list does not contain
auditory stimuli.

In the `sounds` folder there is a stimulus called **"sound_test.mp3"**. The
boilerplate plays this stimulus. It is an artificial *beep* but at full
volume, hence louder than your auditory stimuli. When recording stimuli
we suggest that you also record a stimulus that is going to replace the beep.
The replacement is recorded in a similar fashion as your test stimuli and
then their sound volume will be roughly equivalent.

If you need to change the name of the stimulus, e.g. to `sound_test.wav`, you
will need to make the experiment aware of this change. In the file `globals.js` is
the following variable:

```javascript
// Test stimulus name for the test audio.
const AUDIO_TEST_STIMULUS = "./sounds/sound_test.mp3";
```
One would alter this to become:
```javascript
// Test stimulus name for the test audio.
const AUDIO_TEST_STIMULUS = "./sounds/sound_test.wav";
```

# Output
The data of _all_ (sub) _trial phases_ are logged in the data, but the output
data can be filtered after data collection in many ways.
Please read the
[general primer on jsPsych's data](https://github.com/UiL-OTS-labs/jspsych-output)
if you are new to jsPsych data output.

Essential output for the _'true experimental'_ purpose in this template are:

- Reaction Time (RT) of the keyboard response in the decision phase
- Correctness of the keyboard response in the decision phase

The crucial trial/sub-trial phase (decision phase) output may look similar to
this:

```json
{
    "rt": 848,
    "stimulus": "./sounds/white.wav",
    "response": "l",
    "trial_type": "audio-keyboard-response",
    "trial_index": 54,
    "time_elapsed": 86637,
    "internal_node_id": "0.0-12.0-6.7-0.7",
    "subject": "9mvxuzsx",
    "list": "list1",
    "id": 5,
    "condition": "RELATED",
    "word": "white",
    "expected_answer": 1,
    "visual_prime": "snow",
    "backward_mask": "####",
    "auditory_target": "./sounds/white.wav",
    "useful_data_flag": true,
    "answer": 1,
    "correct": true,
    "integer_correct": 1,
    "pressed_key": "L"
}
```

Some of the output variables may be present or absent based on the
changes you've made to the experiment, e.g. when you don't present a prime, it
won't be in the output. These have a checkmark in the conditional column.

| Variable name (key) | conditional | Description          | Unit   | Type        | Comments                                              | jsPsych default |
|---------------------|-------------|----------------------|--------|-------------|-------------------------------------------------------|-----------------|
| rt                  |             | Reaction Time        | ms.    | int         | Reaction time in milliseconds                         | yes             |
| stimulus            |             | stimulus (html)      |        | string/html | Path to audio file/ or html                           | yes             |
| response            |             | The pressed button   | letter | string/null | Denotes the key pressed/or absence.                   | yes             |
| trial_type          |             | What plugin was used |        |             | "html-keyboard-response" or "audio-keyboard-response" | yes             |
| trial_index         |             | trial_index          | count  | index       | every stimulus is a trial using jspsych               | yes             |
| time_elapsed        |             | jsPsych time object  | ms     | number      | For instance: 45062                                   | yes             |
| internal_node_id.   |             | jsPsych node object  |        |             | For instance:"0.0-11.0-1.4"                           | yes             |
| subject             |             | Subject ID           |        |             | A random string of character or id from dataserver    | no              |
| list                |             | Stimulus list name.  |        | string      | For instance: list1                                   | no              |
| id                  |             | ID/code              |        | number      | identifies a stimulus within a list                   | no              |
| condition           |             | Condition            |        | string      | See ```stimuli.js```; the condition of this trial     | no              |
| word                |             | Decision phase item  |        | string      | See ```stimuli.js``` the word in plain utf8 text      | no              |
| expected_answer     |             | 1 word or 0 non word |        | int         | Signifies what would be the correct response          | no              |
| forward_mask        | ✓           | the forward mask     |        | string      | The presented forward mask                            | no              |
| visual_prime        | ✓           | visual prime         |        | text        | A prime that is displayed on screen                   | no              |
| auditory_prime      | ✓           | auditory prime       |        | string/path | An audible prime                                      | no              |
| backward_mask       | ✓           | backward_mask        |        | string      | The presented backward mask                           | no              |
| auditory_target     | ✓           | Target word          |        | string/path | The sound file that plays the target                  | no              |
| visual_target       | ✓           | Target word          |        | string      | The target word presented on screen                   | no              |
| useful_data_flag    |             | Filter flag          |        | boolean     | may be used to filter useful data during analysis     | no              |
| answer              |             | The provided answer  |        | int         | 1 or 0 if the participant responsed word or non-word  | no              |
| correct             |             | Scoring result       |        | Boolean     | 'true or false' score of response                     | no              |
| integer_correct     |             | Scoring result       |        | integer     | 1 or 0 for correct or incorrect                       | no              |
| pressed key         |             | the key pressed      |        | string/null | An upper cased letter for true or false.              | no              |

Good luck, happy experimenting!

# Reference:
    Rubenstein, H., Garfield, L., & Millikan, J.A. (1970).
    Homographic entries in the internal lexicon.
    Journal of Verbal Learning and Verbal Behavior, 9, 487≠494.

