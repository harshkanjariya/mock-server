const sample = {
    "description": "It can also receive text from a device and play it back as Lorm Alphabet signs,?",
    "creatorId": "63bfd87eb15f89014ba000",
    "url": "https://google1.com",
    "thumbnail": "https://pinsum.photos/200",
    "kind": "ACADEMIC",
    "creator": {
        "name": "CC",
        "avatar": "https://pinsum.photos/200"
    },
    "likes": 0,
    "comments": 0,
    "views": 0,
    "completeViews": 1,
    "incompleteViews": 4,
    "feedpostId": "43c0ef196fdc9d4da859ef7f",
    "createdAt": "2023-01-13T05:41:45.495Z",
    "updatedAt": "2023-01-13T10:53:34.582Z",
    "personal": {
        "liked": true,
        "saved": false
    }
};
let lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pellentesque tempor fermentum. Nunc ut blandit augue. Curabitur enim odio, maximus id mauris pretium, bibendum vehicula erat. Duis lorem elit, aliquam et sem eu, vestibulum sollicitudin metus. Sed id sapien non turpis pharetra faucibus. Duis faucibus justo purus, at malesuada dolor varius sed. Phasellus ex elit, sagittis at leo quis, auctor porttitor quam. Curabitur consectetur tellus leo, sit amet porta leo aliquet in. Phasellus suscipit consectetur arcu sit amet pellentesque. Donec faucibus auctor elit sit amet gravida. Pellentesque nec tellus magna. Nam ornare viverra turpis at gravida.

Cras dignissim lorem augue, a iaculis metus posuere id. Vestibulum aliquam nec leo id lacinia. Donec ut maximus tellus, ac tincidunt tellus. Mauris ac tortor quis augue aliquam porttitor. Aliquam vel imperdiet risus. Curabitur libero nunc, faucibus quis sem in, posuere gravida risus. Donec fermentum iaculis felis, vel ornare massa ultrices non. Pellentesque ornare pharetra mauris, sed commodo metus bibendum vitae. Nullam rhoncus nisl ex, eget maximus neque fermentum eget. Mauris vel hendrerit massa. Nullam vehicula elit eu viverra rhoncus. Donec scelerisque porta condimentum. Phasellus ac metus et dui sodales vehicula.

Nulla vestibulum auctor tincidunt. Donec efficitur nisl vitae magna mattis, eu ultricies quam auctor. Pellentesque tempus sollicitudin lacus, et tincidunt dui varius ut. Phasellus placerat tincidunt sem in elementum. Sed fringilla urna ut urna tincidunt, vitae placerat nisi ultricies. Sed mattis placerat luctus. Cras sed laoreet orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean facilisis non urna quis fermentum. Integer consequat suscipit interdum.

Curabitur hendrerit bibendum nunc ac dictum. Proin vulputate mattis magna a maximus. Vestibulum nec urna ex. Morbi consectetur sem sit amet turpis ultrices luctus. Fusce non suscipit justo. Phasellus tincidunt lacus sit amet libero venenatis lobortis. Pellentesque sodales turpis ante, ac scelerisque nibh finibus id. Proin consequat tellus lorem, sit amet hendrerit nulla vestibulum ac. Integer porta, odio non scelerisque sodales, ipsum neque accumsan dolor, sit amet egestas metus lectus sit amet nisl. Curabitur ultricies felis tellus, non suscipit urna consectetur eu.

Nullam bibendum neque eu ultrices dignissim. Donec sit amet pulvinar magna. Phasellus viverra eu diam ac ultrices. Suspendisse venenatis quis elit at laoreet. In ac justo vel diam malesuada vulputate. Donec varius nibh felis, id feugiat lorem scelerisque vitae. Vivamus posuere mollis enim eget accumsan. Mauris dictum purus sed urna faucibus, porttitor blandit nunc sodales. Proin at nisi vitae ligula tristique iaculis ut sit amet dui. Pellentesque vehicula felis sodales euismod volutpat. Ut interdum quis mauris non dictum. Mauris turpis urna, semper et magna sed, maximus rhoncus dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In et est ut lorem congue pulvinar ac ut ligula.
`;

const data = [];
const creators = [...Array(9)].map((o, index) => 'id_' + index);
const vdos = [
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
];

function random(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
}

for (let i = 0; i < 96; i++) {
    const d = {...sample};
    let dStart = random(0, lorem.length);
    d.description = lorem.substring(dStart, random(dStart, lorem.length));
    d.creatorId = creators[random(0, creators.length)];
    d.url = vdos[random(0, vdos.length)];
    d.likes = random(0, parseInt('1' +'0'.repeat(random(1, 4))));
    d.views = random(0, parseInt('1' +'0'.repeat(random(1, 4))));
    d.comments = random(0, parseInt('1' +'0'.repeat(random(1, 4))));
    d.completeViews = random(0, d.views);
    d.incompleteViews = d.views - d.completeViews;
    d.personal.liked = Math.random() > 0.5;
    d.personal.saved = Math.random() > 0.5;
    d.feedpostId = 'feed_post_' + i;
    data.push(d);
}
const fs = require('fs');
fs.writeFileSync(__dirname + '/data/generated.json', JSON.stringify(data, null, 4));