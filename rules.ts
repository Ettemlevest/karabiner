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
    equal_sign: app("Kitty"),

    o: { // *O*pen applications
      1: app("1Password"),
      a: app("Safari"), // In memory of Arc
      c: app("Spotify"),
      f: app("Finder", secrets.paths.finder_default),
      g: app("ChatGPT"),
      i: open("raycast://extensions/the-browser-company/arc/new-incognito-window"),
      j: app("Linear"),
      n: app("Craft"),
      p: app("PHPStorm"),
      s: app("Slack"),
      t: app("TickTick"),
    },

    f: {
      d: app("Finder", secrets.paths.downloads),
      o: app("Finder", secrets.paths.onedrive),
      m: app("Finder", secrets.paths.musicScores),
      j: app("Finder", secrets.paths.documents),
    },

    s: {
      l: open("raycast://extensions/loris/safari/cloud-tabs"),
      h: open("raycast://extensions/loris/safari/reading-list"),
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
      // positioning
      h: rectangle("first-three-fourths"),
      j: rectangle("first-two-thirds"),
      k: rectangle("center"),
      l: rectangle("last-third"),
      semicolon: rectangle("last-fourth"),
      m: rectangle("left-half"),
      comma: rectangle("right-half"),
      // sizing
      f: rectangle("maximize"),
      d: rectangle("almost-maximize"),

      hyphen: rectangle("smaller"), // ü
      equal_sign: rectangle("larger"), // ó
      // displays
      left_arrow: rectangle("previous-display"),
      right_arrow: rectangle("next-display"),
    },

    c: { // Musi*c*
      i: open("raycast://extensions/mattisssa/spotify-player/nowPlaying"),
      l: open("raycast://extensions/mattisssa/spotify-player/like"),
    },

    // TODO: find a better shortcut key, using R here is not ideal
    r: { // *R*aycast
      j: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
      h: open("raycast://extensions/raycast/calculator/calculator-history"),
      m: open("raycast://extensions/raycast/navigation/search-menu-items"),
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
