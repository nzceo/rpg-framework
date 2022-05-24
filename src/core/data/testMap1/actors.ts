import { IActor } from "../../types/IActor";
import archetypes from "../archetypes/character";
import { dialog } from "../../helpers/disappearingHelpers";
import stats from "../stats";

/**
 * This is essentially test data, the client should send its own
 * mapdata
 */
const actors: IActor[] = [
  {
    id: "testMapActor1",
    name: "Actor 1",
    description: archetypes.normalMan,
    combat: stats.weak,
    dialog: [
      { id: "testMapActor1Dialog1", type: "message", message: "Hello world" },
      {
        id: "testMapActor1Dialog2",
        type: "message",
        message: "And here's a continuation"
      }
    ]
  },
  {
    id: "testMapActor2",
    name: "Actor 2",
    description: archetypes.normalMan,
    combat: stats.weak,
    dialog: [
      { id: "testMapActor1Dialog1", type: "message", message: "Hello world" },
      {
        id: "testMapActor1Dialog2",
        type: "question",
        message: "Hello world",
        options: [
          {
            action: "Asking a question",
            message: "You asked a question",
            next: "testMapActor1Dialog4"
          }
        ]
      },
      {
        id: "testMapActor1Dialog3",
        type: "message",
        message: "This will get skipped"
      },
      {
        id: "testMapActor1Dialog4",
        type: "message",
        message: "I'm answering the question"
      }
    ]
  },
  {
    id: "testMapActor3",
    name: "Actor 3",
    description: archetypes.normalMan,
    combat: stats.unbeatable,
    dialog: [
      {
        id: "testMapActor1Dialog1",
        type: "message",
        message: "Hello world",
        next: "testMapActor1Dialog4"
      },
      {
        id: "testMapActor1Dialog3",
        type: "message",
        message: "This will get skipped"
      },
      {
        id: "testMapActor1Dialog4",
        type: "message",
        message: "I'm answering the question"
      }
    ]
  },
  {
    id: "testMapActor4",
    name: "Actor 4",
    description: archetypes.normalMan,
    combat: stats.weak,
    dialog: [
      {
        id: "dialog1",
        type: "message",
        message: "Hello world",
        visible: (c) =>
          dialog.ifFlagExists({
            flagName: "aflagthatdoesntexist",
            classToCheck: c
          })
      },
      {
        id: "dialog2",
        type: "message",
        message: "This will get skipped"
      },
      {
        id: "dialog3",
        type: "message",
        message: "I'm answering the question"
      }
    ]
  },
  {
    id: "testMapActor5",
    name: "Actor 5",
    description: archetypes.normalMan,
    combat: stats.weak,
    visible: (c) =>
      dialog.ifFlagExists({
        flagName: "aflagthatdoesntexist",
        classToCheck: c
      }),
    dialog: [
      {
        id: "dialog1",
        type: "message",
        message: "Hello world"
      }
    ]
  },
  {
    id: "testMapActor6",
    name: "Actor 6",
    description: archetypes.normalMan,
    combat: stats.weak,
    hidden: (c) =>
      dialog.ifFlagExists({
        flagName: "aflagthatdoesntexist",
        classToCheck: c
      }),
    dialog: [
      {
        id: "dialog1",
        type: "message",
        message: "Hello world"
      }
    ]
  },
  {
    id: "testMapActor7",
    name: "Actor 7",
    description: archetypes.normalMan,
    combat: stats.weak,
    dialog: [
      { id: "Dialog1", type: "message", message: "Hello world" },
      {
        id: "Dialog3",
        type: "message",
        message: "This has a function",
        func: () => null
      }
    ]
  }
];

export default actors;
