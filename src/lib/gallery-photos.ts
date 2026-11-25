// The gallery's photos. Kept apart from the page so the build can read them too: it puts Davin Win
// Kyi's name at the front of every photo's file names and writes each description into its files
// (see vite.config.ts).

// `top` puts a photo near the top of the page: the photos marked 1 (graduation) come first, then
// 2 (the football game), then 3 (other favorites). `group` marks photos with two or more people,
// which come next, before the rest. `caption` appears under the photo, on the page and in the
// viewer; `alt` describes what's in it for screen readers and search engines.
export type Photo = {
  id: string;
  group?: boolean;
  top?: 1 | 2 | 3;
  width: number;
  height: number;
  caption: string;
  alt: string;
};

// Shown in a new random order on every visit: the `top` photos first, then the other group
// photos, then the rest. `id` names the image files in src/assets/gallery; width and height are
// the preview image's size.
export const photos: Photo[] = [
  { id: "night-market-red-carpet", group: true, width: 800, height: 787, caption: "Night market, full stomachs.", alt: "Davin Win Kyi and two friends standing on a red carpet in front of a tall glowing sign at a night market" },
  { id: "peace-sign-selfie", group: true, width: 597, height: 800, caption: "Two grins, one peace sign.", alt: "Davin Win Kyi and a friend grinning in a selfie, one flashing a peace sign, beside an orange wall" },
  { id: "waterfront-sunset-selfie", group: true, width: 800, height: 599, caption: "Sunset squad, assembled.", alt: "Davin Win Kyi in a selfie with three friends on a dock at dusk, with calm water and lit-up houses behind them" },
  { id: "graduation-roses", group: true, top: 1, width: 602, height: 800, caption: "Degree done, roses in hand.", alt: "Davin Win Kyi with parents on graduation day, holding red roses in a graduation gown and purple stole outside Alaska Airlines Field" },
  { id: "lab-aviators", width: 800, height: 660, caption: "Shades on, code compiling.", alt: "Davin Win Kyi leaning back in aviator sunglasses in an office with computer monitors" },
  { id: "snack-mural", width: 774, height: 800, caption: "The mural said it, not me.", alt: "Davin Win Kyi posing in front of a colorful mural of cartoon snacks" },
  { id: "graduation-selfie", group: true, top: 1, width: 800, height: 565, caption: "We did it (somehow).", alt: "Davin Win Kyi in a selfie with friends in graduation caps and gowns at commencement" },
  { id: "graduation-friends", group: true, top: 1, width: 800, height: 572, caption: "Officially overeducated.", alt: "Davin Win Kyi in a commencement selfie with classmates in graduation gowns" },
  { id: "driving-range-swing", width: 465, height: 800, caption: "Fore! (Probably.)", alt: "Davin Win Kyi mid-swing at a golf driving range on a sunny day" },
  { id: "living-room-pose", width: 800, height: 550, caption: "Home gym, open for business.", alt: "Davin Win Kyi in a playful arms-up pose in sunglasses in a living room" },
  { id: "mountain-overlook-pair", group: true, top: 3, width: 800, height: 587, caption: "Views worth the leg day.", alt: "Davin Win Kyi posing with mom on a rocky mountain overlook" },
  { id: "sunny-plaza-pair", group: true, width: 733, height: 800, caption: "Peak sunglasses weather.", alt: "Davin Win Kyi and another person posing on a sunny plaza lined with flags" },
  { id: "pumpkin-carving", width: 757, height: 800, caption: "South Park would approve.", alt: "Two freshly carved jack-o'-lanterns on a kitchen counter" },
  { id: "summit-selfie", group: true, width: 800, height: 619, caption: "Cloud level: unlocked.", alt: "Davin Win Kyi in a selfie with a friend on a mountain summit above the clouds" },
  { id: "classroom-group-selfie", group: true, width: 800, height: 580, caption: "Class dismissed, selfie mandatory.", alt: "Davin Win Kyi in a group selfie with classmates in a classroom" },
  { id: "jack-o-lanterns", width: 615, height: 800, caption: "Simply gourd-geous.", alt: "Three carved jack-o'-lanterns on a kitchen cabinet" },
  { id: "conference-table-group", group: true, width: 800, height: 581, caption: "This meeting could've been a photo.", alt: "Davin Win Kyi with a large group posing around a conference table" },
  { id: "night-balcony", width: 620, height: 800, caption: "Balcony at night, very album cover.", alt: "Davin Win Kyi posing on a balcony at night" },
  { id: "night-headband-selfie", width: 637, height: 800, caption: "Smiling past bedtime.", alt: "Smiling night selfie of Davin Win Kyi in a sports headband" },
  { id: "headset-on-forehead-selfie", width: 624, height: 800, caption: "Reality: temporarily restored.", alt: "Selfie of Davin Win Kyi with a mixed-reality headset pushed up on the forehead" },
  { id: "bright-room-friends", group: true, top: 3, width: 800, height: 539, caption: "Plant-based friendship.", alt: "Davin Win Kyi in a selfie with two friends in a bright room with plants" },
  { id: "resort-selfie", group: true, width: 800, height: 527, caption: "Out of office.", alt: "Davin Win Kyi in a selfie with a friend in front of a resort building" },
  { id: "snowfield-peace-sign", width: 656, height: 800, caption: "Snow problem.", alt: "Davin Win Kyi crouching on a snowfield below a rocky slope, flashing a peace sign" },
  { id: "cafe-mural-selfie", group: true, width: 800, height: 550, caption: "Camera angle: optional.", alt: "Tilted selfie of Davin Win Kyi with a friend at a café with a colorful mural" },
  { id: "rocky-trail-log", width: 616, height: 800, caption: "Log off, peace out.", alt: "Davin Win Kyi sitting on a log on a rocky mountain trail, flashing a peace sign" },
  { id: "football-game-selfie", group: true, top: 2, width: 700, height: 528, caption: "Game day, undefeated in selfies.", alt: "Davin Win Kyi and two friends taking a selfie at a night football game in a packed stadium" },
  { id: "night-game-friends", group: true, top: 2, width: 696, height: 526, caption: "Photobomb: approved.", alt: "Davin Win Kyi in a selfie with friends in the stands at a night game" },
  { id: "bearded-selfie", width: 800, height: 772, caption: "The beard era.", alt: "Smiling selfie of Davin Win Kyi with a beard, in a black T-shirt" },
  { id: "japanese-restaurant-friends", group: true, width: 700, height: 514, caption: "Sushi first, questions later.", alt: "Davin Win Kyi and a friend smiling in a booth at a Japanese restaurant" },
  { id: "throwback-photo", group: true, width: 694, height: 430, caption: "Throwback on the big screen.", alt: "A screen showing an old photo of a young Davin Win Kyi and another boy smiling outdoors" },
  { id: "public-market-sign", width: 646, height: 800, caption: "Main character at Pike Place.", alt: "Davin Win Kyi standing under the glowing Public Market neon sign at night" },
  { id: "restaurant-selfie", group: true, width: 694, height: 748, caption: "Good food, better company.", alt: "Davin Win Kyi in a selfie with a friend outside a restaurant" },
  { id: "city-street-selfie", group: true, width: 608, height: 800, caption: "City walk, zero plans.", alt: "Davin Win Kyi in a selfie with a friend on a city street lined with tall buildings" },
  { id: "mountain-ledge-friends", group: true, width: 466, height: 800, caption: "Summit-adjacent.", alt: "Davin Win Kyi and two friends sitting on a ledge in front of snowy mountains" },
  { id: "heart-arch-friends", group: true, width: 685, height: 800, caption: "The heart wanted a group photo.", alt: "Davin Win Kyi and two friends posing inside a lit-up heart-shaped arch at night" },
  { id: "laughing-restaurant-selfie", group: true, width: 598, height: 800, caption: "Laughing at our own jokes.", alt: "Laughing selfie of Davin Win Kyi with a friend at a restaurant" },
  { id: "flower-arch-friends", group: true, width: 600, height: 800, caption: "Squad in full bloom.", alt: "Davin Win Kyi and three friends standing under a flower-covered arch at night" },
  { id: "rope-net-selfie", width: 449, height: 800, caption: "Caught in the net, happily.", alt: "Selfie of Davin Win Kyi in front of a rope net under a blue sky" },
  { id: "mid-laugh-selfie", width: 595, height: 800, caption: "Unflattering? Unbothered.", alt: "Close-up selfie of Davin Win Kyi mid-laugh" },
  { id: "panda-mural-coffee", width: 608, height: 800, caption: "Coffee for the panda, obviously.", alt: "A hand holding a coffee cup up to a cartoon panda mural" },
  { id: "building-entrance", width: 471, height: 800, caption: "Standing like I own the place.", alt: "Davin Win Kyi standing in front of a building entrance in a navy T-shirt" },
  { id: "fist-sculpture", width: 502, height: 800, caption: "Fist bump, giant edition.", alt: "Davin Win Kyi posing next to a giant fist sculpture on a city plaza" },
  { id: "playful-selfie", width: 578, height: 800, caption: "Unimpressed, allegedly.", alt: "Close-up selfie of Davin Win Kyi indoors with a playful expression" },
  { id: "white-tee-selfie", width: 762, height: 800, caption: "Clean tee, cleaner smile.", alt: "Smiling selfie of Davin Win Kyi in a white T-shirt" },
  { id: "half-dome-view", width: 800, height: 701, caption: "Half Dome, full send.", alt: "Davin Win Kyi sitting on granite rocks with Half Dome in the background" },
  { id: "headset-dinner", width: 448, height: 800, caption: "Dinner, but make it spatial.", alt: "Davin Win Kyi wearing a mixed-reality headset at a restaurant with a graffiti wall" },
  { id: "black-tee-selfie", width: 656, height: 800, caption: "Same smile, different shirt.", alt: "Smiling selfie of Davin Win Kyi in a black T-shirt" },
  { id: "headband-light-selfie", width: 633, height: 800, caption: "Lights on, somebody's home.", alt: "Smiling selfie of Davin Win Kyi wearing a light-up headband" },
  { id: "giant-duck-festival", width: 800, height: 622, caption: "Duck, duck, giant duck.", alt: "Davin Win Kyi standing next to a giant yellow duck statue at a night festival" },
  { id: "tokyo-welcome-mural", width: 596, height: 800, caption: "Tokyo, I have arrived.", alt: "Davin Win Kyi posing by a Welcome to Tokyo mural in an airport hallway" },
];
