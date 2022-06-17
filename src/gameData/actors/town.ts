import stats from "../static/stats";
import Game from "../../core/game/game";
import { IActor } from "../../core/types";
import archetypes from "../archetypes";
import { v4 as uuid } from "uuid";
import Actor from "../../core/actor/actor";
import { fertility } from "../static/fertility";

const actors: IActor[] = [
  {
    id: "heavily_pregnant_waitress",
    name: "heavily pregnant waitress",
    description: archetypes.normalMan,
    combat: stats.weak,
    dialog: [
      {
        id: "heavily_pregnant_waitress_1",
        type: "message",
        message:
          "<i>The big bellied waitress is currently awkwardly bent over a table full of drunken men, trying to collect their glasses. As you wait for her to finish you see one of the men slapping her ass, she doesn't look very comfortable with it but smiles and leaves them be.</i>"
      },
      {
        id: "heavily_pregnant_waitress_2",
        type: "message",
        message:
          "<i>You wave your hand to catch her attention and she starts waddling towards you. As she approaches your eyes are caught by a detail you had previously missed, possibly since you were distracted by her extended womb: her breasts have been tightly stuffed into her revealing uniform, leaving her deep cleavage open for anyone to see.</i>"
      },
      {
        id: "initial_question",
        type: "question",
        message: "Hello, welcome to The Golden Boot! How can I help you today?",
        options: [
          {
            action: "Why are you working here?",
            message: "Why are you working here?",
            next: "work_answer"
          },
          {
            action: "I saw what that man did, why didn't you stop him?",
            message: "I saw what that man did, why didn't you stop him?",
            next: "harrassment_answer"
          },
          {
            action: "How did you get pregnant?",
            message: "How did you get pregnant?",
            next: "pregnant_question"
          },
          {
            action: "Talk to you later",
            message: "Talk to you later",
            next: "convo_end"
          }
        ]
      },
      {
        type: "message",
        id: "work_answer",
        message:
          "Really? Isn't it obvious? Last I checked it was pretty easy to see how pregnant I am. There's not much a girl in my state can do but serve drinks and food to a bunch of old drunks. Or at least that's what they told me back at the farm once my belly became too big to hide."
      },
      {
        id: uuid(),
        type: "message",
        message:
          "Yeah, I might be on my feet all day and my back hurts like a bitch from carrying this baby around, but at least I don't have to work the streets to support myself."
      },
      // {
      //   type: "switch",
      //   flag: "pregInches",
      //   options: {
      //     0: { m: "", next: "initial_question" },
      //     12: {
      //       m: "I mean it's not like you're in a different situation, I'd be surprised if you're not going to be exactly where I am now in a couple of months. ",
      //       next: "initial_question",
      //     },
      //     20: {
      //       m: "I don't know why this is so surprising to you, judging by your size I don't think you're able to do much at the moment.",
      //       next: "initial_question",
      //     },
      //   },
      // },
      {
        type: "message",
        id: "harrassment_answer",
        message:
          "Oh that? It happens, what are you going to do. These bastards pay my salary, I'm not about to ruin such a cushy opportunity just because someone touches me. Being as big as I am I don't get much attention anymore, at least stuff like that reminds me I'm not just a bloated pregnant whale to everyone.",
        next: "initial_question"
      },
      // {
      //   label: "pregnant_question",
      //   type: "switch",
      //   flag: "pregInches",
      //   options: {
      //     0: {
      //       m: "How do you think? A cute guy talked me into sleeping with him, told me he wouldn't come inside and then he forgot to pull out. Before I know it my belly starts rounding out and I find him fucking some other woman. The usual.",
      //       next: "initial_question",
      //     },
      //     12: {
      //       m: "The same way it happened to you I assume, I fucked around and got stuck with the kid while the bastard found some other woman to get pregnant.",
      //       next: "initial_question",
      //     },
      //   },
      //   next: "initial_question",
      // },
      {
        type: "end",
        id: "convo_end"
      }
    ]
  },
  {
    id: "sleep",
    name: "Sleep",
    description: archetypes.normalMan,
    combat: stats.weak,
    dialog: [
      {
        id: "sleep",
        type: "question",
        message: "How long do you want to sleep for?",
        options: [
          {
            action: "7 days",
            message: "",
            next: "sleep_7"
          },
          {
            action: "28 days",
            message: "",
            next: "sleep_28"
          },
          {
            action: "Sleep until full term",
            message: "",
            next: "sleep_279"
          }
        ]
      },
      {
        id: "sleep_7",
        type: "message",
        message: "You sleep for a week.",
        func: (game: Game) => game.sleep(7),
        next: "convo_end"
      },
      {
        id: "sleep_28",
        type: "message",
        message: "You sleep for a month.",
        func: (game: Game) => game.sleep(28),
        next: "convo_end"
      },
      {
        id: "sleep_279",
        type: "message",
        message: "You sleep for a very long time.",
        func: (game: Game) => game.sleep(279),
        next: "convo_end"
      },
      {
        type: "end",
        id: "convo_end"
      }
    ]
  },
  {
    id: "preg",
    name: "make pregnant",
    description: archetypes.normalMan,
    combat: stats.weak,
    dialog: [
      {
        id: "make",
        type: "message",
        message: "You're now pregnant",
        func: (game: Game) => game.player.fertility.debugPregnancy()
      },
      {
        type: "end",
        id: "convo_end"
      }
    ]
  },
  {
    id: "combat",
    name: "test fight",
    description: archetypes.normalMan,
    combat: stats.weak,
    fertility: fertility.standard,
    dialog: [
      {
        id: "fight",
        type: "message",
        message: "Starting fight...",
        func: (game: Game) => {
          game.enemyData = [new Actor(actors[3], game)];
          game.player.switchState("combat");
        }
      },
      {
        type: "end",
        id: "convo_end"
      }
    ]
  },
  {
    id: "add-item",
    name: "add item to inventory",
    description: archetypes.normalMan,
    combat: stats.weak,
    fertility: fertility.standard,
    dialog: [
      {
        id: "add",
        type: "message",
        message: "Added item...",
        func: (game: Game) => {
          game.player.inventory.addItem(game.findItem("dress"));
        }
      },
      {
        type: "end",
        id: "convo_end"
      }
    ]
  }
];

export default actors;
