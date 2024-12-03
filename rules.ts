import fs from "fs";
import { KarabinerRules } from "./types";
import { app, createHyperSubLayers, open, rectangle } from "./utils";
import { secrets } from "./secrets";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      }
    ],
  },
  ...createHyperSubLayers({
    o: { // *O*pen applications
      1: app("1Password"),
      a: app("Arc"),
      c: app("Spotify"),
      f: app("Finder"),
      i: open("raycast://extensions/the-browser-company/arc/new-incognito-window"),
      m: open("raycast://extensions/the-browser-company/arc/new-little-arc"),
      n: app("Capacities"),
      p: app("PHPStorm"),
      s: app("Slack"),
      t: app("TickTick"),
      v: app("Visual Studio Code")
    },

    // TODO: This doesn't quite work yet.
    // l = "Layouts" via Raycast's custom window management
    // l: {
    //   // Coding layout
    //   c: shell`
    //     open -a "Visual Studio Code.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topLeft&relativeWidth=0.5"

    //     open -a "Terminal.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topRight&relativeWidth=0.5"
    //   `,
    // },

    w: { // *W*indow management via rectangle.app
      h: rectangle("first-three-fourths"),
      j: rectangle("first-two-thirds"),
      k: rectangle("center"),
      l: rectangle("last-third"),
      semicolon: rectangle("last-fourth"),
      f: rectangle("maximize"),
      return_or_enter: rectangle("maximize"),
      hyphen: rectangle("smaller"),
      equal_sign: rectangle("larger"),
      left_arrow: rectangle("previous-display"),
      right_arrow: rectangle("next-display"),
      m: rectangle("left-half"),
      comma: rectangle("right-half"),

      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
    },

    s: { // *S*ystem
      c: open("raycast://extensions/raycast/system/open-camera"),
    },

    c: { // Musi*c*
      i: open("raycast://extensions/mattisssa/spotify-player/nowPlaying"),
      l: open("raycast://extensions/mattisssa/spotify-player/like"),
    },

    // TODO: find a better shortcut key, using R here is not ideal
    r: { // *R*aycast
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      e: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
      h: open("raycast://extensions/raycast/calculator/calculator-history"),
      l: open("raycast://extensions/the-browser-company/arc/search-tabs"),
      n: open("raycast://extensions/raycast/snippets/search-snippets"),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      s: open("raycast://extensions/raycast/screenshots/search-screenshots"),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
