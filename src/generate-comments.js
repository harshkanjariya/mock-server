const sample = {
    _id: 'comment_id_',
    text: '',
    type: 'FEEDPOST_COMMENT',
    typeId: 'feed_post_0',
    createdBy: {
        _id: 'id_2',
        firstName: 'CC',
        lastName: 'name',
        imageId: {
            _id: '98712309823',
            name: 'string',
            type: 'png',
            baseUrl: 'https://picsum.photos',
            key: '/200',
        },
    },
    status: 'Active',
    childCommentCount: 0,
    upVoteCount: 0,
    downVoteCount: 0,
    reportCount: 0,
    satisfactoryRate: 0,
    displayOrder: 1,
    createdAt: 'Date',
    rated: 0,
};
let lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pellentesque tempor fermentum. Nunc ut blandit augue. Curabitur enim odio, maximus id mauris pretium, bibendum vehicula erat. Duis lorem elit, aliquam et sem eu, vestibulum sollicitudin metus. Sed id sapien non turpis pharetra faucibus. Duis faucibus justo purus, at malesuada dolor varius sed. Phasellus ex elit, sagittis at leo quis, auctor porttitor quam. Curabitur consectetur tellus leo, sit amet porta leo aliquet in. Phasellus suscipit consectetur arcu sit amet pellentesque. Donec faucibus auctor elit sit amet gravida. Pellentesque nec tellus magna. Nam ornare viverra turpis at gravida.

Cras dignissim lorem augue, a iaculis metus posuere id. Vestibulum aliquam nec leo id lacinia. Donec ut maximus tellus, ac tincidunt tellus. Mauris ac tortor quis augue aliquam porttitor. Aliquam vel imperdiet risus. Curabitur libero nunc, faucibus quis sem in, posuere gravida risus. Donec fermentum iaculis felis, vel ornare massa ultrices non. Pellentesque ornare pharetra mauris, sed commodo metus bibendum vitae. Nullam rhoncus nisl ex, eget maximus neque fermentum eget. Mauris vel hendrerit massa. Nullam vehicula elit eu viverra rhoncus. Donec scelerisque porta condimentum. Phasellus ac metus et dui sodales vehicula.

Nulla vestibulum auctor tincidunt. Donec efficitur nisl vitae magna mattis, eu ultricies quam auctor. Pellentesque tempus sollicitudin lacus, et tincidunt dui varius ut. Phasellus placerat tincidunt sem in elementum. Sed fringilla urna ut urna tincidunt, vitae placerat nisi ultricies. Sed mattis placerat luctus. Cras sed laoreet orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean facilisis non urna quis fermentum. Integer consequat suscipit interdum.

Curabitur hendrerit bibendum nunc ac dictum. Proin vulputate mattis magna a maximus. Vestibulum nec urna ex. Morbi consectetur sem sit amet turpis ultrices luctus. Fusce non suscipit justo. Phasellus tincidunt lacus sit amet libero venenatis lobortis. Pellentesque sodales turpis ante, ac scelerisque nibh finibus id. Proin consequat tellus lorem, sit amet hendrerit nulla vestibulum ac. Integer porta, odio non scelerisque sodales, ipsum neque accumsan dolor, sit amet egestas metus lectus sit amet nisl. Curabitur ultricies felis tellus, non suscipit urna consectetur eu.

Nullam bibendum neque eu ultrices dignissim. Donec sit amet pulvinar magna. Phasellus viverra eu diam ac ultrices. Suspendisse venenatis quis elit at laoreet. In ac justo vel diam malesuada vulputate. Donec varius nibh felis, id feugiat lorem scelerisque vitae. Vivamus posuere mollis enim eget accumsan. Mauris dictum purus sed urna faucibus, porttitor blandit nunc sodales. Proin at nisi vitae ligula tristique iaculis ut sit amet dui. Pellentesque vehicula felis sodales euismod volutpat. Ut interdum quis mauris non dictum. Mauris turpis urna, semper et magna sed, maximus rhoncus dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In et est ut lorem congue pulvinar ac ut ligula.
`;

const data = [];
function random(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
}

for (let i = 0; i < 1000; i++) {
    const d = {...sample};
    let dStart = random(0, lorem.length);
    d.text = lorem.substring(dStart, random(dStart, lorem.length));
    d.upVoteCount = random(0, parseInt('1' +'0'.repeat(random(1, 4))));
    d.downVoteCount = random(0, parseInt('1' +'0'.repeat(random(1, 4))));
    d.reportCount = random(0, parseInt('1' +'0'.repeat(random(1, 4))));
    d.rated = random(0, 2);
    d._id = d._id + i;
    const startDate = (new Date('2023-02-01 00:00:00')).getTime();
    const endDate = Date.now();
    d.createdAt = new Date(random(startDate, endDate));

    if (Math.random() > 0.5 && i > 0) {
        const dataIndex = random(0, data.length);
        d.parentId = data[dataIndex]._id;
        data[dataIndex].childCommentCount = data[dataIndex].childCommentCount + 1;
    }
    data.push(d);
}
const fs = require('fs');
fs.writeFileSync(__dirname + '/data/comments.json', JSON.stringify(data, null, 4));