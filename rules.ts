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
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({
    spacebar: open(
      "raycast://extensions/raycast/apple-reminders/create-reminder"
    ),
    // b = "B"rowse
    b: {
      f: open("https://bowl.hu/forum/feliratkozasok"), // TODO: find a better shortcut
      p: open("https://prohardver.hu"),
      n: open(secrets.nas_address),
      y: open("https://news.ycombinator.com"),
    },
    // o = "Open" applications
    o: {
      1: app("1Password"),
      a: app("Arc"),
      c: app("PHPStorm"),
      d: app("Discord"),
      f: app("Finder"),
      i: open("raycast://extensions/the-browser-company/arc/new-incognito-window"),
      m: app("Spotify"),
      // "N"otes (Obsidian.md)
      n: open("raycast://extensions/KevinBatdorf/obsidian/openVaultCommand"),
      s: app("Slack"),
      t: app("iTerm2"),
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

    // w = "Window" via rectangle.app
    w: {
      h: rectangle("first-three-fourths"),
      j: rectangle("first-two-thirds"),
      k: open("raycast://extensions/raycast/window-management/reasonable-size"),
      l: rectangle("last-third"),
      semicolon: rectangle("last-fourth"),
      f: rectangle("maximize"),
      return_or_enter: rectangle("maximize"), // for old times sakekk
      c: rectangle("center"),
      hyphen: rectangle("smaller"),
      equal_sign: rectangle("larger"),
      left_arrow: rectangle("previous-display"),
      right_arrow: rectangle("next-display"),
      m: rectangle("left-half"),
      comma: rectangle("right-half"),

      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
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

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      c: open("raycast://extensions/raycast/system/open-camera"),
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
      i: open("raycast://extensions/mattisssa/spotify-player/nowPlaying"),
      l: open("raycast://extensions/mattisssa/spotify-player/like")
    },

    // r = "Raycast"
    r: {
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      e: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
      h: open("raycast://extensions/raycast/calculator/calculator-history"),
      l: open("raycast://extensions/the-browser-company/arc/search-tabs"),
      n: open("raycast://extensions/raycast/snippets/search-snippets"),
      p: open("raycast://extensions/raycast/raycast/confetti"),
    },

    e: {
      l: open("raycast://extensions/raycast/apple-reminders/my-reminders")
    }
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
