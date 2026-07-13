import { definePassage, type GospelLesson } from '../types.ts';

export const matthewLesson: GospelLesson = {
  id: 'gospel-matthew',
  shortName: 'Matthew',
  title: 'Matthew: Jesus Teaches About God’s Kingdom',
  eyebrow: 'Unit 2 · Gospel of Matthew',
  subtitle: 'Follow Matthew’s clear teaching about Jesus, God’s promises, and the mission of his followers.',
  symbol: '♛',
  theme: {
    name: 'Royal Archive',
    motif: 'Messiah · Teaching · Kingdom · Mission',
    colors: {
      background: '#f3ead7',
      surface: '#fffaf0',
      primary: '#5b1f2f',
      secondary: '#8a4a3a',
      accent: '#b98228',
      text: '#2f211c',
      muted: '#75645b',
      border: '#d8c6a5',
    },
  },
  gospelLens: [
    'Notice how Matthew connects Jesus to Israel’s Scriptures and story.',
    'Remember that the Kingdom of Heaven also means God acting in the world now.',
    'Watch how Jesus teaches people to live as a faithful community.',
    'Track “God with us” from the beginning of Matthew to the final mission.',
  ],
  passages: [
    definePassage({
      id: 'matthew-1-emmanuel',
      title: 'Joseph & Emmanuel',
      reference: 'Matthew 1:18–25',
      difficulty: 'Intermediate',
      estimatedMinutes: 16,
      anchorPhrase: 'A threatened family story becomes a sign that God is with us.',
      contextNotes: [
        'Matthew tells the birth from Joseph’s perspective and emphasizes his just, merciful response.',
        'Names carry interpretation: Jesus is linked with salvation and Emmanuel with God’s presence.',
      ],
      keyImages: ['dream', 'name', 'Spirit', 'Emmanuel', 'obedience'],
      catholicConnection:
        'The passage supports Catholic teaching on the Incarnation, Mary’s virginal conception, Joseph’s vocation, family life, and God’s faithful presence.',
      eisegesisTrap:
        'Avoid portraying Joseph as passive. Matthew presents justice, mercy, discernment, and courageous action working together.',
      teacherNote:
        'Ask students how the names interpret the child before he speaks or acts.',
      exemplars: {
        literal:
          'Joseph learns that Mary is pregnant and plans a quiet separation to avoid public harm. In a dream, he is told that the child is from the Spirit; he accepts the vocation of naming and caring for Jesus.',
        allegorical:
          'Jesus fulfills the promise of Emmanuel: in him, God is decisively present with humanity to save. Joseph’s welcome helps place Jesus within David’s family line.',
        moral:
          'Joseph models justice shaped by mercy, careful discernment, and willingness to act faithfully when God’s call disrupts a plan.',
        anagogical:
          'Emmanuel points toward the final dwelling of God with humanity, when divine presence is known without separation or fear.',
      },
    }),
    definePassage({
      id: 'matthew-2-magi',
      title: 'The Magi Seek the King',
      reference: 'Matthew 2:1–12',
      difficulty: 'Starter',
      estimatedMinutes: 15,
      anchorPhrase: 'Foreign seekers recognize a king whom power fears.',
      contextNotes: [
        'The visitors are learned Gentile astrologers; Matthew does not number them or call them kings.',
        'Their search contrasts with Herod’s fear and Jerusalem’s disturbance.',
      ],
      keyImages: ['star', 'journey', 'king', 'gifts', 'homage'],
      catholicConnection:
        'The Epiphany celebrates Christ revealed to the nations. The story also invites discernment about political power, worship, and gifts placed at Christ’s service.',
      eisegesisTrap:
        'Avoid adding details from later tradition as though Matthew states them. Distinguish the biblical text from artistic and devotional development.',
      teacherNote:
        'Have students create a text-versus-tradition list, then discuss why traditions can still carry meaning.',
      exemplars: {
        literal:
          'Magi follow a sign to Jerusalem seeking the newborn king of the Jews. Herod secretly plans to use them, but they find Jesus, offer gifts, and return home by another road after a warning.',
        allegorical:
          'Gentile seekers worship Israel’s Messiah, showing that Christ’s saving kingship is for all nations. Their gifts have long helped Christians contemplate his kingship, divinity, and suffering.',
        moral:
          'The Magi model persistent searching, humility before truth, generosity, and the wisdom to refuse cooperation with destructive power.',
        anagogical:
          'People from the nations gathering around Christ anticipate the universal worship and peace of God’s fulfilled Kingdom.',
      },
    }),
    definePassage({
      id: 'matthew-3-baptism',
      title: 'Baptism in the Jordan',
      reference: 'Matthew 3:13–17',
      difficulty: 'Starter',
      estimatedMinutes: 13,
      anchorPhrase: 'Jesus enters the water in solidarity and the heavens open.',
      contextNotes: [
        'John initially resists baptizing Jesus, creating a question about righteousness and solidarity.',
        'Water, Spirit, voice, Son, and delight make the scene richly Trinitarian.',
      ],
      keyImages: ['Jordan', 'water', 'heavens', 'Spirit', 'beloved Son'],
      catholicConnection:
        'The scene illuminates the Trinity, Jesus’ solidarity with sinners, and Christian Baptism as identity, grace, mission, and participation in Christ.',
      eisegesisTrap:
        'Do not conclude that Jesus is baptized because he has personal sins to confess. Read his action within solidarity, mission, and fulfillment of righteousness.',
      teacherNote:
        'Ask what each voice, movement, and image contributes to the identity of Jesus.',
      exemplars: {
        literal:
          'Jesus comes to John for Baptism, overcomes John’s hesitation, and enters the Jordan. As he rises, the Spirit descends and a heavenly voice identifies him as the beloved Son.',
        allegorical:
          'The scene reveals Father, Son, and Spirit and prepares Jesus’ saving mission. Christian Baptism joins believers to Christ’s identity and mission by grace.',
        moral:
          'Jesus’ solidarity calls disciples to humility, and the beloved identity reminds Christians to act from received dignity rather than earn worth through performance.',
        anagogical:
          'The opened heavens anticipate restored communion between God and creation and the destiny of the baptized in eternal life.',
      },
    }),
    definePassage({
      id: 'matthew-4-temptation',
      title: 'Tested in the Wilderness',
      reference: 'Matthew 4:1–11',
      difficulty: 'Intermediate',
      estimatedMinutes: 18,
      anchorPhrase: 'The Son refuses power detached from trust and love.',
      contextNotes: [
        'The forty days recall Israel’s wilderness testing and follow immediately after Jesus is named beloved Son.',
        'Both Jesus and the tempter quote Scripture, proving that quotation alone is not faithful interpretation.',
      ],
      keyImages: ['wilderness', 'bread', 'temple', 'kingdoms', 'worship'],
      catholicConnection:
        'The passage shapes Lent, spiritual discernment, fasting, resistance to distorted power, and the Catholic principle that Scripture must be read as a coherent whole.',
      eisegesisTrap:
        'Avoid assuming that quoting a verse makes an interpretation faithful. The tempter uses Scripture without its proper relationship to God’s will.',
      teacherNote:
        'This is an excellent text for showing that context and the unity of Scripture matter.',
      exemplars: {
        literal:
          'In the wilderness, Jesus is tested to use his identity for self-serving provision, spectacle, and domination. He answers from Scripture and remains faithful in worship and trust.',
        allegorical:
          'Jesus relives Israel’s testing as the faithful Son and rejects the distortions of messianic power. His obedience prepares the saving mission completed in the Paschal Mystery.',
        moral:
          'Disciples should test attractive choices by their relationship to trust, truth, worship, human dignity, and God’s whole message—not by convenience or isolated proof-texts.',
        anagogical:
          'Jesus’ victory anticipates the final defeat of evil and the restoration of rightly ordered worship in God’s Kingdom.',
      },
    }),
    definePassage({
      id: 'matthew-5-beatitudes',
      title: 'Beatitudes, Salt & Light',
      reference: 'Matthew 5:1–16',
      difficulty: 'Challenge',
      estimatedMinutes: 22,
      anchorPhrase: 'Jesus announces a Kingdom-shaped vision of flourishing.',
      contextNotes: [
        'The Beatitudes open the Sermon on the Mount and address disciples within a gathered crowd.',
        'Blessing names God’s action and promised future; it does not call suffering itself good.',
      ],
      keyImages: ['mountain', 'blessing', 'salt', 'light', 'city'],
      catholicConnection:
        'The Beatitudes are a central Catholic map of discipleship, virtue, justice, holiness, solidarity, and hope in God’s Kingdom.',
      eisegesisTrap:
        'Avoid turning the Beatitudes into motivational slogans or using them to tell oppressed people to accept injustice. They announce God’s reversal and form agents of mercy and peace.',
      teacherNote:
        'Ask which Beatitudes name present conditions, which promise God’s action, and how salt/light turns blessing outward.',
      exemplars: {
        literal:
          'Jesus teaches that people often dismissed or suffering within the present world are held within God’s blessing and promise. He then calls disciples salt and light whose visible goodness serves others and honours God.',
        allegorical:
          'Jesus authoritatively reveals the character of God’s Kingdom and forms the Church as a sign of that Kingdom through mercy, justice, purity of heart, and peacemaking.',
        moral:
          'Disciples must practise mercy, pursue justice, make peace, remain faithful under pressure, and use their influence for the good of the world rather than self-promotion.',
        anagogical:
          'The promises of comfort, mercy, inheritance, and seeing God reach toward the final fulfillment of the Kingdom, where every faithful longing is completed.',
      },
    }),
    definePassage({
      id: 'matthew-6-prayer',
      title: 'The Lord’s Prayer',
      reference: 'Matthew 6:5–15',
      difficulty: 'Starter',
      estimatedMinutes: 15,
      anchorPhrase: 'Jesus teaches prayer that reorders desire toward God and neighbour.',
      contextNotes: [
        'The prayer sits within teaching about practising faith without performing for public praise.',
        'Its plural language—our, us, we—makes even private prayer communal.',
      ],
      keyImages: ['Father', 'kingdom', 'bread', 'debt', 'deliverance'],
      catholicConnection:
        'The Our Father is central to Catholic liturgy, the Rosary, daily prayer, forgiveness, trust, and longing for God’s Kingdom.',
      eisegesisTrap:
        'Avoid treating prayer as a formula for getting every desired outcome. Jesus teaches relationship, dependence, forgiveness, and alignment with God’s reign.',
      teacherNote:
        'Sort the petitions into God-centred and human-need language, then show how the two belong together.',
      exemplars: {
        literal:
          'Jesus warns against prayer performed for attention and gives disciples a concise communal prayer. It honours God, asks for the Kingdom, daily provision, forgiveness, and rescue from evil.',
        allegorical:
          'Christ draws disciples into his own relationship with the Father and forms the Church as a praying family that depends on grace and seeks the Kingdom.',
        moral:
          'The prayer calls believers to trust for daily needs, forgive as they seek forgiveness, resist evil, and desire God’s will beyond private preference.',
        anagogical:
          'Praying for the Kingdom to come reaches toward the day when God’s name is honoured and divine will is perfectly lived throughout creation.',
      },
    }),
    definePassage({
      id: 'matthew-13-sower',
      title: 'The Sower & the Soils',
      reference: 'Matthew 13:1–23',
      difficulty: 'Intermediate',
      estimatedMinutes: 20,
      anchorPhrase: 'One generous sower meets four conditions of hearing.',
      contextNotes: [
        'The parable follows growing conflict over Jesus’ words and actions.',
        'The focus is not only initial hearing but understanding, endurance, freedom from competing pressures, and fruit.',
      ],
      keyImages: ['seed', 'path', 'rock', 'thorns', 'fruit'],
      catholicConnection:
        'The parable supports lectio divina, formation of conscience, perseverance, evangelization, and the cooperation of human freedom with grace.',
      eisegesisTrap:
        'Avoid permanently labelling other people as one bad soil. The parable invites every listener to examine changing conditions within the heart and community.',
      teacherNote:
        'Shift students from judging four kinds of people to examining four kinds of response.',
      media: [
        {
          id: 'matthew13-four-soils-motion', type: 'video', title: 'One Seed, Four Conditions of Hearing',
          instructionalPurpose: 'Compare interpretations', optional: true,
          description: 'Compare what stays constant and what changes across the path, rocky ground, thorns, and good soil.',
          textAlternative: 'The animation keeps one seed constant while showing four receiving conditions: the path, rocky ground, thorns, and good soil. Each condition is paired with a response such as no understanding, no root, competing pressures, or hearing that becomes fruit. It ends by asking students to examine conditions for hearing rather than permanently label people.',
          beforeViewing: [{ id: 'constant-change', prompt: 'What stays constant across the four soils, and what changes?' }],
          afterViewing: [{ id: 'conditions', prompt: 'Which detail supports interpreting the soils as changing conditions of hearing rather than permanent labels for people?' }],
          video: { src: 'media/matthew13-four-soils-motion.mp4', hosting: 'local', mimeType: 'video/mp4', silent: true, width: 1280, height: 720, poster: { src: 'media/matthew13-four-soils-poster.png', hosting: 'local' } },
          credit: { sourceName: 'HRE4M Remotion motion library', sourceUrl: 'media/matthew13-four-soils-motion.mp4', creator: 'HRE4M Interactive Learning Hub', licence: 'CC BY 4.0', licenceUrl: 'https://creativecommons.org/licenses/by/4.0/', attribution: 'One Seed, Four Conditions of Hearing by HRE4M Interactive Learning Hub, licensed CC BY 4.0.' },
        },
      ],
      exemplars: {
        literal:
          'Jesus describes seed falling on a path, shallow rock, thorny ground, and good soil. He later explains how different conditions affect whether the word is understood, endures, or bears fruit.',
        allegorical:
          'The seed is the word of the Kingdom generously offered through Christ. The fruitful harvest points to grace received, understood, and embodied by disciples and the Church.',
        moral:
          'Listeners should cultivate depth, endurance, freedom from consuming anxieties, and habits that allow God’s word to become visible fruit.',
        anagogical:
          'The abundant harvest anticipates the completion of God’s Kingdom, when the divine word reaches its intended fruitfulness.',
      },
    }),
    definePassage({
      id: 'matthew-16-keys',
      title: 'Peter, Rock & Keys',
      reference: 'Matthew 16:13–20',
      difficulty: 'Challenge',
      estimatedMinutes: 20,
      anchorPhrase: 'A confession of Christ becomes a responsibility for communion.',
      contextNotes: [
        'Jesus asks first about public opinion and then makes the question personal for the disciples.',
        'Rock, keys, binding, and loosing are images of stability, stewardship, and authoritative responsibility.',
      ],
      keyImages: ['rock', 'keys', 'gates', 'binding', 'Church'],
      catholicConnection:
        'This passage is foundational for Catholic understanding of Peter, the papacy, teaching authority, unity, and service within the Church.',
      eisegesisTrap:
        'Avoid reading authority as personal status or domination. In Matthew, leadership is accountable to Christ and must be interpreted through service, forgiveness, and the Cross.',
      teacherNote:
        'Pair the honour of the passage with Peter’s correction in the verses that immediately follow.',
      exemplars: {
        literal:
          'Peter confesses Jesus as Messiah and Son of the living God. Jesus calls him blessed, gives him a new role through the images of rock and keys, and speaks of building his Church.',
        allegorical:
          'Christ builds and preserves his Church, entrusting Peter with a real ministry of unity and stewardship. The authority remains Christ’s gift and participates in his mission.',
        moral:
          'Christian leadership must join truthful confession, humble reception of grace, responsibility for unity, and service accountable to Christ.',
        anagogical:
          'The promise that death’s gates will not prevail points toward Christ’s final victory and the gathered communion of God’s people.',
      },
    }),
    definePassage({
      id: 'matthew-25-nations',
      title: 'Judgment of the Nations',
      reference: 'Matthew 25:31–46',
      difficulty: 'Challenge',
      estimatedMinutes: 22,
      anchorPhrase: 'The hidden Christ is encountered in neighbours made vulnerable.',
      contextNotes: [
        'The scene concludes a major teaching section about watchfulness, responsibility, and the coming of the Son of Man.',
        'Food, drink, welcome, clothing, care, and visitation are concrete works rather than abstract feelings.',
      ],
      keyImages: ['shepherd', 'nations', 'least', 'mercy', 'judgment'],
      catholicConnection:
        'The passage grounds the corporal works of mercy, Catholic Social Teaching, the dignity of every person, the preferential option for the poor, and final judgment.',
      eisegesisTrap:
        'Avoid using “the least” as a distant category. The passage challenges how communities respond to real people and social conditions here and now.',
      teacherNote:
        'Move from individual acts to the systems that either make mercy possible or keep needs invisible.',
      exemplars: {
        literal:
          'The Son of Man judges the nations and identifies himself with people who were hungry, thirsty, displaced, unclothed, sick, or imprisoned. The groups are surprised that their treatment of others was treatment of him.',
        allegorical:
          'Christ is mysteriously present in vulnerable neighbours. The King’s identification with the least reveals how communion with Christ is inseparable from love enacted toward others.',
        moral:
          'Disciples must practise concrete mercy and help build social conditions that protect food, shelter, health, welcome, dignity, and human connection.',
        anagogical:
          'The scene points directly to final judgment and the fulfilled Kingdom, where every hidden act and neglected neighbour is brought into truth.',
      },
    }),
    definePassage({
      id: 'matthew-28-mission',
      title: 'The Great Commission',
      reference: 'Matthew 28:16–20',
      difficulty: 'Intermediate',
      estimatedMinutes: 16,
      anchorPhrase: 'The risen Christ sends an imperfect community with a promise of presence.',
      contextNotes: [
        'The disciples worship, yet Matthew also notes doubt within the group.',
        'The mission includes going, making disciples, baptizing, and teaching a lived obedience to Jesus’ commands.',
      ],
      keyImages: ['mountain', 'authority', 'nations', 'Baptism', 'presence'],
      catholicConnection:
        'The passage names the Trinity, Baptism, evangelization, catechesis, apostolic mission, and Christ’s enduring presence with the Church.',
      eisegesisTrap:
        'Avoid confusing mission with coercion or cultural domination. Jesus sends disciples to teach his way and serve all nations while remaining under his authority.',
      teacherNote:
        'Have students connect the ending promise of presence to Emmanuel in Matthew 1.',
      exemplars: {
        literal:
          'The risen Jesus meets the eleven in Galilee. Although worship and doubt coexist, he claims authority and sends them to make disciples among all nations through Baptism and teaching.',
        allegorical:
          'The risen Christ commissions the Church for a Trinitarian mission. His promised presence completes Matthew’s Emmanuel theme and sustains sacramental and teaching ministry.',
        moral:
          'Disciples should share faith with humility, teach through credible practice, welcome people across boundaries, and trust Christ while questions remain.',
        anagogical:
          'The mission to all nations anticipates the final gathering of humanity and Christ’s presence through the completion of the age.',
      },
    }),
  ],
  quiz: [
    {
      id: 'matthew-q1',
      statement: 'Comparing “Emmanuel” in Matthew 1 with Jesus’ promise of presence in Matthew 28 uses the Gospel’s structure as evidence.',
      answer: 'Exegesis',
      feedback: 'The literary connection is internal to Matthew and clarifies a major Gospel theme.',
    },
    {
      id: 'matthew-q2',
      statement: 'The Beatitudes prove that people should quietly accept injustice.',
      answer: 'Eisegesis',
      feedback: 'The Beatitudes announce God’s reversal and form merciful peacemakers who hunger for justice.',
    },
    {
      id: 'matthew-q3',
      statement: 'Because the tempter quotes Scripture, Matthew 4 shows that quotations must still be interpreted in context.',
      answer: 'Exegesis',
      feedback: 'The scene itself contrasts faithful and distorted use of Scripture.',
    },
    {
      id: 'matthew-q4',
      statement: 'The Magi were definitely three kings because that is exactly what Matthew says.',
      answer: 'Eisegesis',
      feedback: 'Matthew says neither that they were kings nor that there were three; those details developed in tradition.',
    },
    {
      id: 'matthew-q5',
      statement: 'The concrete needs in Matthew 25 can inform a Catholic moral reading about works of mercy.',
      answer: 'Exegesis',
      feedback: 'A moral sense grows from the passage’s actual actions and its identification of Christ with vulnerable people.',
    },
  ],
  sortingActivity: [
    { id: 'matthew-s1', text: 'Jesus teaches a communal prayer for God’s name, Kingdom, bread, forgiveness, and deliverance.', answer: 'Literal' },
    { id: 'matthew-s2', text: 'Christ draws the Church into his relationship with the Father.', answer: 'Allegorical' },
    { id: 'matthew-s3', text: 'Those who ask forgiveness must also practise forgiveness.', answer: 'Moral' },
    { id: 'matthew-s4', text: 'The prayer for God’s Kingdom reaches toward creation’s final fulfillment.', answer: 'Anagogical' },
    { id: 'matthew-s5', text: 'The risen Jesus sends the eleven to baptize and teach among all nations.', answer: 'Literal' },
    { id: 'matthew-s6', text: 'The commission reveals the Trinitarian mission of Christ’s Church.', answer: 'Allegorical' },
    { id: 'matthew-s7', text: 'Christian witness must teach through credible and humble practice.', answer: 'Moral' },
    { id: 'matthew-s8', text: 'The nations’ gathering anticipates the completed Kingdom.', answer: 'Anagogical' },
  ],
};
