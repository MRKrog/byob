let concertData = [
  {
    name: 'The 1975',
    genre: 'Rock',
    concerts: [
      {
        date: 'TUESDAY April 30, 2019',
        time_start: '7:00 PM',
        time_doors: '6:00 PM',
        tickets_link: 'https://www.axs.com/events/363535/the-1975-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Twiddle / Pigeon Playing Ping Pong',
    genre: 'Rock',
    concerts: [
      {
        date: 'THURSDAY May 02, 2019',
        time_start: '5:30 PM',
        time_doors: '5:00 PM',
        tickets_link: 'https://www.axs.com/events/363528/twiddle-pigeons-playing-ping-pong-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Shpongle Live In Concert',
    genre: 'Psychedelic',
    concerts: [
      {
        date: 'FRIDAY May 03, 2019',
        time_start: '7:00 PM',
        time_doors: '6:30 PM',
        tickets_link: 'https://www.axs.com/events/361628/shpongle-live-in-concert-tickets?skin=redrocks',
      },
      {
        date: 'SATURDAY May 04, 2019',
        time_start: '7:00 PM',
        time_doors: '7:00 PM',
        tickets_link: 'https://www.axs.com/events/361629/shpongle-live-in-concert-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Nghtmre / Slander',
    genre: 'Metal',
    concerts: [
      {
        date: 'SUNDAY May 05, 2019',
        time_start: '4:00 PM',
        time_doors: '4:00 PM',
        tickets_link: 'https://www.axs.com/events/363968/nghtmre-slander-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: '4U: Music of Prince',
    genre: 'Rock',
    concerts: [
      {
        date: 'TUESDAY May 06, 2019',
        time_start: '7:30 PM',
        time_doors: '6:00 PM',
        tickets_link: 'https://www.axs.com/events/368559/4u-the-music-of-prince-with-the-colorado-symphony-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Vulfpeck',
    genre: 'Hard Rock',
    concerts: [
      {
        date: 'THURSDAY May 09, 2019',
        time_start: '7:00 PM',
        time_doors: '6:00 PM',
        tickets_link: 'https://www.axs.com/events/364883/vulfpeck-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Papadosio & The Polish Ambassador',
    genre: 'Electronic',
    concerts: [
      {
        date: 'SATURDAY May 11, 2019',
        time_start: '7:00 PM',
        time_doors: '6:00 PM',
        tickets_link: 'http://www.axs.com/events/366910/papadosio-the-polish-ambassador-ft-wildlight-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Luke Combs',
    genre: 'Country',
    concerts: [
      {
        date: 'SUNDAY May 12, 2019',
        time_start: '7:00 PM',
        time_doors: '5:30 PM',
        tickets_link: 'http://www.axs.com/events/361018/luke-combs-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Lord Huron',
    genre: 'Rock',
    concerts: [
      {
        date: 'TUESDAY May 14, 2019',
        time_start: '7:00 PM',
        time_doors: '6:00 PM',
        tickets_link: 'https://www.axs.com/events/363296/lord-huron-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Walk Off The Earth',
    genre: 'Rock',
    concerts: [
      {
        date: 'WEDNESDAY May 15, 2019',
        time_start: '6:30 PM',
        time_doors: '5:30 PM',
        tickets_link: 'https://www.axs.com/events/366566/walk-off-the-earth-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Florence + The Machine',
    genre: 'Rock',
    concerts: [
      {
        date: 'MONDAY May 20, 2019',
        time_start: '7:30 PM',
        time_doors: '6:30 PM',
        tickets_link: 'https://www.axs.com/events/369043/florence-the-machine-the-high-as-hope-tour-2019-tickets?skin=redrocks',
      },
      {
        date: 'TUESDAY May 21, 2019',
        time_start: '7:30 PM',
        time_doors: '6:30 PM',
        tickets_link: 'https://www.axs.com/events/369157/florence-the-machine-the-high-as-hope-tour-2019-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'The Devil Makes Three',
    genre: 'Rock',
    concerts: [
      {
        date: 'FRIDAY May 24, 2019',
        time_start: '7:00 PM',
        time_doors: '6:00 PM',
        tickets_link: 'https://www.axs.com/events/364687/the-devil-makes-three-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'The Disco Biscuits',
    genre: 'Jam',
    concerts: [
      {
        date: 'SATURDAY May 24, 2019',
        time_start: '6:30 PM',
        time_doors: '5:30 PM',
        tickets_link: 'https://www.axs.com/events/368375/the-disco-biscuits-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Chromeo / Thievery Corporation',
    genre: 'Electronic',
    concerts: [
      {
        date: 'FRIDAY May 31, 2019',
        time_start: '6:00 PM',
        time_doors: '5:00 PM',
        tickets_link: 'https://www.axs.com/events/367755/chromeo-thievery-corporation-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Moe.',
    genre: 'Jam',
    concerts: [
      {
        date: 'SATURDAY June 01, 2019',
        time_start: '6:00 PM',
        time_doors: '5:00 PM',
        tickets_link: 'https://www.axs.com/events/365396/moe-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Parade of Bass FT. Dillion Francis',
    genre: 'Electronic',
    concerts: [
      {
        date: 'SUNDAY June 01, 2019',
        time_start: '5:00 PM',
        time_doors: '5:00 PM',
        tickets_link: 'https://www.axs.com/events/371057/parade-of-bass-ft-dillon-francis-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Parade of Bass FT. Dillion Francis',
    genre: 'Electronic',
    concerts: [
      {
        date: 'SUNDAY June 01, 2019',
        time_start: '5:00 PM',
        time_doors: '5:00 PM',
        tickets_link: 'https://www.axs.com/events/371057/parade-of-bass-ft-dillon-francis-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Billie Eilish',
    genre: 'Country',
    concerts: [
      {
        date: 'WEDNESDAY June 05, 2019',
        time_start: '7:30 PM',
        time_doors: '6:30 PM',
        tickets_link: 'https://www.axs.com/events/369165/billie-eilish-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Brit Floyd',
    genre: 'Rock',
    concerts: [
      {
        date: 'THURSDAY June 06, 2019',
        time_start: '8:00 PM',
        time_doors: '6:30 PM',
        tickets_link: 'https://www.axs.com/events/367469/brit-floyd-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Michael Franti and Spearhead Floyd',
    genre: 'Rock',
    concerts: [
      {
        date: 'FRIDAY June 07, 2019',
        time_start: '7:00 PM',
        time_doors: '6:30 PM',
        tickets_link: 'https://www.axs.com/events/363373/michael-franti-spearhead-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Big Head Todd and The Monsters',
    genre: 'Rock',
    concerts: [
      {
        date: 'SATURDAY June 08, 2019',
        time_start: '6:30 PM',
        time_doors: '5:00 PM',
        tickets_link: 'https://www.axs.com/events/366026/big-head-todd-and-the-monsters-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Dispatch Summer Stops 2019',
    genre: 'Rock',
    concerts: [
      {
        date: 'SUNDAY June 09, 2019',
        time_start: '7:00 PM',
        time_doors: '6:00 PM',
        tickets_link: 'https://www.axs.com/events/368406/dispatch-summer-stops-2019-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Sublime with Rome',
    genre: 'Rock',
    concerts: [
      {
        date: 'MONDAY June 10, 2019',
        time_start: '6:00 PM',
        time_doors: '5:00 PM',
        tickets_link: 'https://www.axs.com/events/369080/sublime-with-rome-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Rainbox Kitten Suprise',
    genre: 'Rock',
    concerts: [
      {
        date: 'TUESDAY June 11, 2019',
        time_start: '7:00 PM',
        time_doors: '6:00 PM',
        tickets_link: 'https://www.axs.com/events/366569/rainbow-kitten-surprise-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Young The Giant / Fitz and The Tantrums',
    genre: 'Rock',
    concerts: [
      {
        date: 'WEDNESDAY June 12, 2019',
        time_start: '7:00 PM',
        time_doors: '6:00 PM',
        tickets_link: 'https://www.axs.com/events/369876/young-the-giant-fitz-the-tantrums-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'San Holo',
    genre: 'Electronic',
    concerts: [
      {
        date: 'THURSDAY June 13, 2019',
        time_start: '7:00 PM',
        time_doors: '6:00 PM',
        tickets_link: 'https://www.axs.com/events/368663/san-holo-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Lettuce',
    genre: 'Jam',
    concerts: [
      {
        date: 'SATURDAY June 15, 2019',
        time_start: '6:00 PM',
        time_doors: '5:30 PM',
        tickets_link: 'https://www.axs.com/events/366344/lettuce-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Turnpike Troubadours',
    genre: 'Country',
    concerts: [
      {
        date: 'TUESDAY June 18, 2019',
        time_start: '6:30 PM',
        time_doors: '5:00 PM',
        tickets_link: 'https://www.axs.com/events/370441/turnpike-troubadours-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Zedd On The Rocks',
    genre: 'Electronic',
    concerts: [
      {
        date: 'WEDNESDAY June 19, 2019',
        time_start: '6:00 PM',
        time_doors: '5:30 PM',
        tickets_link: 'https://www.axs.com/events/369860/zedd-on-the-rocks-tickets?skin=redrocks',
      }
    ]
  },
  {
    name: 'Umphreys Mcgee',
    genre: 'Jam',
    concerts: [
      {
        date: 'FRIDAY June 12, 2019',
        time_start: '7:00 PM',
        time_doors: '6:00 PM',
        tickets_link: 'https://www.axs.com/events/365938/umphrey-s-mcgee-tickets?skin=redrocks',
      },
      {
        date: 'SATURDAY June 22, 2019',
        time_start: '7:00 PM',
        time_doors: '6:00 PM',
        tickets_link: 'https://www.axs.com/events/365939/umphrey-s-mcgee-tickets?skin=redrocks',
      },
      {
        date: 'SUNDAY June 23, 2019',
        time_start: '5:00 PM',
        time_doors: '4:00 PM',
        tickets_link: 'https://www.axs.com/events/365940/umphrey-s-mcgee-tickets?skin=redrocks',
      }
    ]
  }
]

module.exports = concertData;
