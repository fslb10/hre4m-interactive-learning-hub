import { definePassage, type GospelLesson } from '../types';

export const lukeLesson: GospelLesson = {
  id: 'gospel-luke',
  shortName: 'Luke',
  title: 'Gospel of Luke: Mercy on the Road',
  eyebrow: 'Unit 2 · Encounters of Mercy',
  subtitle: 'Read Luke’s ordered account by following prayer, reversal, table fellowship, and joy for outsiders.',
  symbol: '◡',
  theme: {
    name: 'Mercy Journal',
    motif: 'Mercy · Outsiders · Prayer · Joy',
    colors: {
      background: '#f7eef2',
      surface: '#fffafc',
      primary: '#512f63',
      secondary: '#7564a7',
      accent: '#d66f81',
      text: '#33243d',
      muted: '#78677e',
      border: '#e4cdd9',
    },
  },
  gospelLens: [
    'Notice people at the edges: the poor, outsiders, women, sinners, the sick, and social enemies.',
    'Track prayer and the Holy Spirit at important turning points.',
    'Watch what happens at meals, where welcome, status, forgiveness, and mission are revealed.',
    'Look for reversals in which the lowly are raised and the secure are challenged to conversion.',
  ],
  passages: [
    definePassage({
      id: 'luke-1-annunciation',
      title: 'The Annunciation',
      reference: 'Luke 1:26–38',
      difficulty: 'Intermediate',
      estimatedMinutes: 17,
      anchorPhrase: 'A young woman’s courageous consent opens a new chapter of salvation.',
      contextNotes: [
        'Luke places Mary’s encounter beside Zechariah’s earlier announcement so readers can compare the scenes.',
        'Titles, Spirit, overshadowing, promise, questioning, and consent shape the passage.',
      ],
      keyImages: ['greeting', 'favour', 'Spirit', 'overshadowing', 'servant'],
      catholicConnection:
        'The passage is central to the Incarnation, Marian discipleship, the Rosary, Advent, grace, vocation, and free cooperation with God.',
      eisegesisTrap:
        'Avoid portraying Mary as silent or passive. She questions, discerns, and freely offers a courageous response to God’s call.',
      teacherNote:
        'Compare Mary’s question with Zechariah’s response and ask what Luke communicates through the parallel structure.',
      exemplars: {
        literal:
          'Gabriel announces that Mary will conceive Jesus through the Holy Spirit and that her son will receive David’s throne. Mary asks how this will happen, receives an explanation, and freely accepts the vocation.',
        allegorical:
          'The eternal Son enters human history through Mary’s Spirit-filled consent. She also becomes an image of the Church receiving God’s word and bearing Christ for the world.',
        moral:
          'Mary models thoughtful questioning, trust that does not require total control, and freedom offered to a vocation larger than personal plans.',
        anagogical:
          'The promised Kingdom without end points toward the final reign of Christ, when God’s saving purpose is fully realized.',
      },
    }),
    definePassage({
      id: 'luke-2-shepherds',
      title: 'Good News for Shepherds',
      reference: 'Luke 2:1–20',
      difficulty: 'Starter',
      estimatedMinutes: 16,
      anchorPhrase: 'Imperial power frames a birth announced first to field workers.',
      contextNotes: [
        'Luke places Jesus’ birth within the reach of the Roman Empire and an ordered registration.',
        'The angelic titles and message echo public claims about rulers, but the sign is a vulnerable infant.',
      ],
      keyImages: ['journey', 'manger', 'shepherds', 'glory', 'peace'],
      catholicConnection:
        'The Christmas Gospel proclaims the Incarnation, God’s option for the lowly, human dignity, contemplative wonder, and a peace deeper than imperial control.',
      eisegesisTrap:
        'Avoid turning the scene into only sentimental holiday imagery. Luke contrasts systems of power with God’s vulnerable, peace-making arrival.',
      teacherNote:
        'Ask what the powerful emperor orders, what God announces, and where genuine good news is found.',
      exemplars: {
        literal:
          'Mary and Joseph travel because of an imperial registration, and Jesus is born and laid in a manger. Angels announce good news to shepherds, who visit, report what they heard, and return praising God.',
        allegorical:
          'The Saviour and Messiah comes in humility, revealing divine glory through vulnerability. The shepherds’ witness begins the outward movement of the Gospel.',
        moral:
          'The passage calls disciples to recognize dignity where society overlooks it, welcome good news with action, and become witnesses rather than private consumers of hope.',
        anagogical:
          'The angelic promise of peace points toward creation reconciled under Christ, when God’s glory and human flourishing are fully united.',
      },
    }),
    definePassage({
      id: 'luke-4-nazareth',
      title: 'Jesus Names His Mission',
      reference: 'Luke 4:16–30',
      difficulty: 'Challenge',
      estimatedMinutes: 21,
      anchorPhrase: 'A hometown sermon announces liberation and exposes the limits of belonging.',
      contextNotes: [
        'Luke places this synagogue scene at the beginning of Jesus’ public ministry as a mission statement.',
        'The crowd’s response changes when Jesus recalls God’s mercy reaching outsiders through Elijah and Elisha.',
      ],
      keyImages: ['scroll', 'Spirit', 'good news', 'release', 'outsiders'],
      catholicConnection:
        'The passage grounds Catholic mission to the poor, liberation from oppression, Jubilee, the dignity of outsiders, and the social demands of evangelization.',
      eisegesisTrap:
        'Avoid spiritualizing release so completely that poverty, captivity, exclusion, and oppression disappear from the passage.',
      teacherNote:
        'Track the exact moment admiration changes to rage and ask what boundary Jesus crosses.',
      exemplars: {
        literal:
          'Jesus reads Isaiah in the Nazareth synagogue and declares the Scripture fulfilled. Initial approval turns to rage after he recalls prophets through whom God aided Gentile outsiders.',
        allegorical:
          'Jesus is the Spirit-anointed Messiah who fulfills God’s promised liberation. His mission reveals salvation expanding beyond narrow claims of possession or privilege.',
        moral:
          'Disciples must join good news with concrete freedom and resist the temptation to limit God’s mercy to people who resemble or reward them.',
        anagogical:
          'Jubilee release anticipates the fulfilled Kingdom, where oppression ends, creation is restored, and every people shares God’s freedom.',
      },
    }),
    definePassage({
      id: 'luke-5-call',
      title: 'Deep Water Discipleship',
      reference: 'Luke 5:1–11',
      difficulty: 'Starter',
      estimatedMinutes: 15,
      anchorPhrase: 'An exhausted worker risks trust and discovers a new vocation.',
      contextNotes: [
        'Simon has already worked through the night without a catch and lends Jesus his boat as a teaching place.',
        'The overwhelming catch leads not to pride but to fear, recognition, reassurance, and call.',
      ],
      keyImages: ['boat', 'deep water', 'nets', 'abundance', 'call'],
      catholicConnection:
        'The passage supports discernment of vocation, trust after failure, communal mission, Peter’s leadership, and grace that transforms ordinary skills.',
      eisegesisTrap:
        'Avoid reading the large catch as a guarantee of material prosperity. Luke makes abundance a call into service and discipleship.',
      teacherNote:
        'Ask how Simon’s language and actions change from the beginning to the end.',
      exemplars: {
        literal:
          'After teaching from Simon’s boat, Jesus tells the tired fishers to try again in deep water. A huge catch overwhelms the nets; Simon responds with fear, and Jesus calls him into a new mission.',
        allegorical:
          'Christ transforms ordinary labour into participation in gathering people for God. The boat and shared nets also suggest a Church sustained by grace and cooperation.',
        moral:
          'The fishers model honest doubt, willingness to try again, humility before grace, and readiness to place skill and experience at the service of vocation.',
        anagogical:
          'The abundant gathering anticipates the final communion of humanity in God’s Kingdom.',
      },
    }),
    definePassage({
      id: 'luke-7-forgiven',
      title: 'At Simon’s Table',
      reference: 'Luke 7:36–50',
      difficulty: 'Intermediate',
      estimatedMinutes: 20,
      anchorPhrase: 'A judged guest reveals the love that forgiveness releases.',
      contextNotes: [
        'A woman enters a Pharisee’s meal and performs actions of hospitality that the host did not offer Jesus.',
        'Jesus tells a brief creditor parable to expose Simon’s interpretation of both the woman and Jesus.',
      ],
      keyImages: ['table', 'tears', 'oil', 'debt', 'peace'],
      catholicConnection:
        'The passage illuminates reconciliation, mercy, repentance, anointing, hospitality, human dignity, and the peace that follows forgiveness.',
      eisegesisTrap:
        'Avoid inventing the woman’s specific sin or sexualizing her without textual evidence. Luke emphasizes social judgment, love, forgiveness, and restored dignity.',
      teacherNote:
        'Compare how Simon sees the woman with how Jesus speaks to and about her.',
      exemplars: {
        literal:
          'During a meal at Simon’s house, a woman known publicly as a sinner honours Jesus with tears, touch, and ointment. Jesus answers Simon’s silent judgment with a parable and announces forgiveness and peace.',
        allegorical:
          'Jesus reveals God’s merciful authority to forgive and restore communion. The meal becomes a sign that grace welcomes the excluded and exposes self-righteous distance.',
        moral:
          'The passage calls disciples to examine judgment, offer genuine hospitality, receive forgiveness with gratitude, and protect another person’s dignity from gossip or assumption.',
        anagogical:
          'The restored guest at table points toward the final banquet of mercy, where forgiven people live in peace before God.',
      },
    }),
    definePassage({
      id: 'luke-10-samaritan',
      title: 'The Good Samaritan',
      reference: 'Luke 10:25–37',
      difficulty: 'Intermediate',
      estimatedMinutes: 19,
      anchorPhrase: 'The question “Who belongs?” becomes “Will I become a neighbour?”',
      contextNotes: [
        'Jesus answers a legal expert’s attempt to define the limit of obligation with a story.',
        'The Samaritan would be a socially and religiously charged choice of compassionate outsider for Jesus’ audience.',
      ],
      keyImages: ['road', 'wounds', 'passing by', 'oil', 'neighbour'],
      catholicConnection:
        'The parable grounds works of mercy, Catholic health care, social friendship, solidarity across prejudice, and love that becomes material care.',
      eisegesisTrap:
        'Avoid reducing the parable to “be nice.” It overturns social boundaries, costs the Samaritan something, and asks the listener to become a neighbour through action.',
      teacherNote:
        'End with Jesus’ changed question: not “Who qualifies?” but “Who acted as neighbour?”',
      exemplars: {
        literal:
          'A man is attacked and left injured. Two religious figures pass by, while a Samaritan approaches, treats his wounds, transports him, pays for care, and promises to return.',
        allegorical:
          'The compassionate outsider can reflect Christ, who comes near wounded humanity and bears the cost of restoration. The inn has also been read as an image of the Church’s healing mission.',
        moral:
          'Love of neighbour crosses prejudice, accepts interruption, addresses practical needs, and builds structures of ongoing care rather than offering only a feeling.',
        anagogical:
          'The movement from near-death to restored community points toward God’s final healing of human division and suffering.',
      },
    }),
    definePassage({
      id: 'luke-15-prodigal',
      title: 'The Lost Sons & Merciful Father',
      reference: 'Luke 15:11–32',
      difficulty: 'Challenge',
      estimatedMinutes: 24,
      anchorPhrase: 'A father goes out to meet two different forms of lostness.',
      contextNotes: [
        'The parable responds to criticism that Jesus welcomes sinners and eats with them.',
        'The story remains open: readers do not learn whether the older son enters the celebration.',
      ],
      keyImages: ['inheritance', 'far country', 'embrace', 'feast', 'threshold'],
      catholicConnection:
        'The parable is central to Reconciliation, conversion, God’s mercy, restored dignity, table fellowship, and the Church’s call to welcome without denying truth.',
      eisegesisTrap:
        'Avoid calling only the younger son lost. The older son’s resentment and refusal of relationship reveal another form of distance from the father.',
      teacherNote:
        'Track the father’s movement toward each son and the dignity-restoring details of the welcome.',
      exemplars: {
        literal:
          'A younger son wastes his inheritance, returns hoping to become a worker, and is welcomed with restored family status and a feast. The older son refuses to celebrate, and the father goes out to plead with him too.',
        allegorical:
          'The father images God’s mercy seeking both obvious sinners and the self-righteous. The feast reflects restored communion made possible through forgiving love.',
        moral:
          'Disciples are called to return honestly when lost, restore dignity when forgiving, and confront resentment that treats another person’s mercy as a personal loss.',
        anagogical:
          'The celebration of one who was lost and found anticipates the joy of the heavenly banquet and the final reconciliation God desires.',
      },
    }),
    definePassage({
      id: 'luke-19-zacchaeus',
      title: 'Zacchaeus Comes Down',
      reference: 'Luke 19:1–10',
      difficulty: 'Starter',
      estimatedMinutes: 15,
      anchorPhrase: 'Being seen and welcomed becomes measurable conversion.',
      contextNotes: [
        'As a chief tax collector, Zacchaeus is wealthy through a system associated with Roman extraction and local resentment.',
        'His response involves restitution and distribution, not only private emotion.',
      ],
      keyImages: ['crowd', 'tree', 'table', 'restitution', 'salvation'],
      catholicConnection:
        'The story joins personal conversion with restorative justice, the universal call to salvation, stewardship, and Jesus’ table fellowship with sinners.',
      eisegesisTrap:
        'Avoid treating conversion as words alone. Luke gives economic and relational evidence that Zacchaeus’s encounter changes his life.',
      teacherNote:
        'Ask students to identify who grumbles, who moves, and what concrete actions demonstrate transformation.',
      exemplars: {
        literal:
          'Zacchaeus climbs a tree to see Jesus, who calls him down and chooses to stay at his house. In response to public complaint, Zacchaeus commits wealth to the poor and restitution for fraud.',
        allegorical:
          'Jesus seeks and saves the lost, bringing salvation into a rejected person’s household. Table fellowship becomes a sign of grace that creates transformation.',
        moral:
          'Authentic conversion should become visible in repaired relationships, honest use of money, restitution where harm occurred, and welcome that does not freeze people in their past.',
        anagogical:
          'The restored household anticipates the final communion where injustice is repaired and those who were lost are gathered by God.',
      },
    }),
    definePassage({
      id: 'luke-22-23-passion',
      title: 'Mercy in the Passion',
      reference: 'Luke 22–23 (selected passages)',
      difficulty: 'Challenge',
      estimatedMinutes: 28,
      anchorPhrase: 'In betrayal and violence, Jesus continues to heal, forgive, and promise hope.',
      contextNotes: [
        'Luke highlights prayer, compassion, healing, forgiveness, innocence, and care for others through the Passion.',
        'Scenes such as the servant’s healed ear and the condemned man beside Jesus shape Luke’s distinctive portrait.',
      ],
      keyImages: ['table', 'prayer', 'healing', 'Cross', 'paradise'],
      catholicConnection:
        'The Passion is at the heart of the Eucharist, Holy Week, forgiveness, redemptive love, care for the dying, and Christian hope in the Paschal Mystery.',
      eisegesisTrap:
        'Avoid blaming the Jewish people collectively for Jesus’ death. Interpret the Passion with historical care and the Church’s clear rejection of antisemitism.',
      teacherNote:
        'Compare Luke’s Passion details with another Gospel and ask how the differences shape theological emphasis.',
      exemplars: {
        literal:
          'Jesus shares a final meal, prays in anguish, is betrayed, arrested, tried, and crucified. Throughout these events Luke emphasizes healing, forgiveness, care, innocence, and a promise of paradise.',
        allegorical:
          'Jesus completes his saving self-gift as the innocent, merciful Messiah. The meal and Cross reveal a new covenant in which divine love answers sin without becoming violent in return.',
        moral:
          'The Passion calls disciples to pray in crisis, reject retaliatory violence, remain compassionate under pressure, tell the truth, and entrust suffering to God.',
        anagogical:
          'The promise of paradise reveals that death does not sever communion with Christ and points toward resurrection and eternal life.',
      },
    }),
    definePassage({
      id: 'luke-24-emmaus',
      title: 'The Road to Emmaus',
      reference: 'Luke 24:13–35',
      difficulty: 'Intermediate',
      estimatedMinutes: 21,
      anchorPhrase: 'Scripture, hospitality, and broken bread transform a road of disappointment.',
      contextNotes: [
        'The disciples know many facts about Jesus but cannot yet interpret them through the Resurrection.',
        'Recognition develops through conversation, Scripture, invitation, table, and return to community.',
      ],
      keyImages: ['road', 'hidden companion', 'burning heart', 'table', 'return'],
      catholicConnection:
        'The passage closely reflects the movement of the Mass: gathering, Scripture, interpretation, Eucharistic recognition, and mission back to the community.',
      eisegesisTrap:
        'Avoid treating personal spiritual feeling as the whole message. Recognition is tested by Scripture, hospitality, sacramental action, and renewed community.',
      teacherNote:
        'Map the story’s sequence against the Liturgy of the Word and Liturgy of the Eucharist.',
      exemplars: {
        literal:
          'Two disappointed disciples leave Jerusalem and speak with an unrecognized Jesus. He interprets Scripture, accepts their hospitality, is recognized in the breaking of bread, and they return to the community.',
        allegorical:
          'The risen Christ is encountered through Scripture and the breaking of bread. The journey reflects the Church’s Eucharistic worship and mission.',
        moral:
          'Disciples should listen deeply to grief, welcome the stranger, interpret experience through Scripture, and return to community with renewed hope.',
        anagogical:
          'The shared road and table anticipate the final pilgrimage into full recognition and the eternal banquet with the risen Christ.',
      },
    }),
  ],
  quiz: [
    {
      id: 'luke-q1',
      statement: 'Luke 4 connects Jesus’ Spirit-filled mission with good news for people experiencing poverty and oppression.',
      answer: 'Exegesis',
      feedback: 'Those concrete groups and conditions appear in Jesus’ chosen Scripture and mission announcement.',
    },
    {
      id: 'luke-q2',
      statement: 'The Good Samaritan is only a reminder to be friendly.',
      answer: 'Eisegesis',
      feedback: 'The parable confronts prejudice, social boundaries, risk, material cost, and sustained care.',
    },
    {
      id: 'luke-q3',
      statement: 'The open ending of the lost sons parable invites the listener to decide whether to enter the father’s joy.',
      answer: 'Exegesis',
      feedback: 'The unresolved older-son scene is a meaningful literary feature in the parable’s original controversy.',
    },
    {
      id: 'luke-q4',
      statement: 'Zacchaeus proves that saying sorry is enough even when someone has caused financial harm.',
      answer: 'Eisegesis',
      feedback: 'Luke highlights concrete redistribution and restitution as evidence of conversion.',
    },
    {
      id: 'luke-q5',
      statement: 'Emmaus can be read with attention to both its first-century meal scene and its resonance with Catholic liturgy.',
      answer: 'Exegesis',
      feedback: 'The deeper Catholic connection remains grounded in the narrative’s Scripture, hospitality, bread, recognition, and mission.',
    },
  ],
  sortingActivity: [
    { id: 'luke-s1', text: 'A Samaritan treats an injured traveller and pays for continued care.', answer: 'Literal' },
    { id: 'luke-s2', text: 'The compassionate outsider can image Christ coming near wounded humanity.', answer: 'Allegorical' },
    { id: 'luke-s3', text: 'Neighbour-love must cross prejudice and respond to practical need.', answer: 'Moral' },
    { id: 'luke-s4', text: 'Restoration from near-death points toward God’s final healing.', answer: 'Anagogical' },
    { id: 'luke-s5', text: 'Two disciples recognize Jesus after Scripture is opened and bread is broken.', answer: 'Literal' },
    { id: 'luke-s6', text: 'The Emmaus pattern reflects Christ’s presence in Word and Eucharist.', answer: 'Allegorical' },
    { id: 'luke-s7', text: 'Disciples should welcome strangers and bring renewed hope back to community.', answer: 'Moral' },
    { id: 'luke-s8', text: 'The table anticipates full recognition at the heavenly banquet.', answer: 'Anagogical' },
  ],
};
