import { definePassage, type GospelLesson } from '../types.ts';

export const markLesson: GospelLesson = {
  id: 'gospel-mark',
  shortName: 'Mark',
  title: 'Mark: Following Jesus on the Way',
  eyebrow: 'Unit 2 · Gospel of Mark',
  subtitle: 'Follow Mark’s fast-moving story and learn what it means to follow Jesus, even when it is difficult.',
  symbol: '➜',
  theme: {
    name: 'Field Notes',
    motif: 'Action · Discipleship · Cross · Courage',
    colors: {
      background: '#e9f1ef',
      surface: '#f9fffd',
      primary: '#103a43',
      secondary: '#147d80',
      accent: '#f09a3e',
      text: '#142b30',
      muted: '#597277',
      border: '#c9dcda',
    },
  },
  gospelLens: [
    'Notice Mark’s fast pace and the many words about movement and action.',
    'Watch who understands Jesus and who gets him wrong, including the disciples.',
    'Notice how Jesus shows power through healing, service, suffering, and the Cross.',
    'Ask what it costs to follow Jesus and how fear can change into courage.',
  ],
  passages: [
    definePassage({
      id: 'mark-1-beginning',
      title: 'The Beginning of the Good News',
      reference: 'Mark 1:1–15',
      difficulty: 'Intermediate',
      estimatedMinutes: 16,
      anchorPhrase: 'The story begins in the wilderness with urgent good news.',
      contextNotes: [
        'Mark begins without an infancy narrative and quickly introduces John, Baptism, testing, and proclamation.',
        'The title “good news” had public and political resonance as well as religious meaning.',
      ],
      keyImages: ['wilderness', 'way', 'water', 'Spirit', 'kingdom'],
      catholicConnection:
        'The passage connects Baptism, conversion, the liturgical season of Advent, and the Church’s call to announce God’s reign in word and action.',
      eisegesisTrap:
        'Avoid shrinking repentance into private guilt alone. Mark joins it to a new orientation toward God’s arriving Kingdom.',
      teacherNote:
        'Ask students what Mark makes readers know in the opening that characters inside the story will struggle to understand.',
      exemplars: {
        literal:
          'Mark introduces John preparing the way, Jesus being baptized and tested, and Jesus announcing that God’s Kingdom has drawn near. The opening moves rapidly from preparation to public mission.',
        allegorical:
          'Jesus fulfills the promised way of the Lord and enters Israel’s story to overcome evil. His Baptism and Spirit-led mission reveal him as the beloved Son who brings God’s reign.',
        moral:
          'The opening calls readers to turn their lives toward God, trust the good news, and prepare pathways of justice and faithfulness for others.',
        anagogical:
          'The nearness of God’s Kingdom points toward its final fulfillment, when creation is freed from evil and fully ordered to God.',
      },
    }),
    definePassage({
      id: 'mark-1-disciples',
      title: 'Called from the Shore',
      reference: 'Mark 1:16–20',
      difficulty: 'Starter',
      estimatedMinutes: 12,
      anchorPhrase: 'A direct call interrupts ordinary work.',
      contextNotes: [
        'The first disciples are called while working in the fishing economy of Galilee.',
        'Mark emphasizes the immediacy of their response but will later show how incomplete their understanding remains.',
      ],
      keyImages: ['shore', 'nets', 'boat', 'call', 'following'],
      catholicConnection:
        'The story supports Catholic reflection on vocation: every Baptized person is called, and particular vocations take shape through concrete relationships and service.',
      eisegesisTrap:
        'Avoid romanticizing discipleship as one dramatic decision with no further struggle. Mark will show a long process of misunderstanding and conversion.',
      teacherNote:
        'Invite students to compare what is left behind, what is carried forward, and what remains unknown.',
      exemplars: {
        literal:
          'Jesus calls two pairs of working fishermen to follow him. They leave nets, boats, and family business to join his mission, even though they do not yet know where the way will lead.',
        allegorical:
          'Christ gathers a new community for mission. Their changed use of fishing imagery points from ordinary labour toward participation in God’s work of gathering people.',
        moral:
          'Discipleship requires attention to Christ’s call, willingness to change direction, and trust that grows through action rather than complete certainty.',
        anagogical:
          'The gathering mission anticipates God’s final communion, where people are drawn from division into the fulfilled Kingdom.',
      },
    }),
    definePassage({
      id: 'mark-2-paralytic',
      title: 'Through the Roof',
      reference: 'Mark 2:1–12',
      difficulty: 'Starter',
      estimatedMinutes: 15,
      anchorPhrase: 'Persistent friends carry a neighbour toward healing and forgiveness.',
      contextNotes: [
        'The crowded house and opened roof make the friends’ determination central to the scene.',
        'Jesus’ claim to forgive sins becomes the deeper conflict beneath the visible healing.',
      ],
      keyImages: ['crowd', 'roof', 'mat', 'forgiveness', 'rising'],
      catholicConnection:
        'The passage joins bodily and spiritual healing and connects with communal intercession, reconciliation, and the Church’s ministry to the whole person.',
      eisegesisTrap:
        'Do not conclude that illness proves sin or weak faith. The story focuses on Jesus’ authority and the community’s persistent care.',
      teacherNote:
        'Ask why Jesus’ first words surprise both the reader and the teachers of the law.',
      exemplars: {
        literal:
          'Four people lower a paralyzed man through a roof because the crowd blocks the door. Jesus announces forgiveness, responds to critics, and heals the man so that he rises and carries his mat home.',
        allegorical:
          'The visible healing confirms Jesus’ authority to forgive and restore the whole person. The man’s rising also faintly anticipates resurrection life.',
        moral:
          'The friends model creative, communal faith that refuses to let barriers prevent a vulnerable person from reaching help.',
        anagogical:
          'Forgiveness and restored movement point toward the final healing of body and soul in the resurrection.',
      },
    }),
    definePassage({
      id: 'mark-4-storm',
      title: 'Crossing the Storm',
      reference: 'Mark 4:35–41',
      difficulty: 'Intermediate',
      estimatedMinutes: 15,
      anchorPhrase: 'Fear in the boat becomes a question about identity.',
      contextNotes: [
        'The crossing follows a day of teaching and moves Jesus toward Gentile territory.',
        'The disciples’ final question about Jesus is the narrative’s main destination.',
      ],
      keyImages: ['boat', 'sea', 'storm', 'sleep', 'calm'],
      catholicConnection:
        'The boat has long served as an image of the Church, sustained by Christ’s presence through fear, persecution, and uncertainty.',
      eisegesisTrap:
        'Avoid treating this as a promise that believers will never face danger. The disciples encounter Christ’s presence and authority within a real storm.',
      teacherNote:
        'Centre the final question: what does the action invite readers to conclude about Jesus?',
      exemplars: {
        literal:
          'A violent storm threatens the disciples’ boat while Jesus sleeps. They wake him in fear; he stills the wind and sea, then challenges their fear and lack of trust.',
        allegorical:
          'Jesus’ authority over chaotic waters reveals divine power, while the boat can symbolize the Church learning to trust Christ during crisis.',
        moral:
          'Faith does not deny danger; it brings fear honestly to Christ and resists letting panic erase memory of his presence.',
        anagogical:
          'The silenced chaos anticipates God’s final victory over every force that threatens life and communion.',
      },
    }),
    definePassage({
      id: 'mark-5-daughters',
      title: 'Two Daughters, One Hope',
      reference: 'Mark 5:21–43',
      difficulty: 'Challenge',
      estimatedMinutes: 23,
      anchorPhrase: 'Two stories of desperation are woven into one movement of restoration.',
      contextNotes: [
        'Mark interrupts Jairus’s story with the healing of a woman who has suffered for twelve years.',
        'Status, public honour, ritual impurity, touch, fear, and delay shape how the two stories speak to one another.',
      ],
      keyImages: ['crowd', 'touch', 'daughter', 'twelve years', 'rising'],
      catholicConnection:
        'The intertwined stories reveal Christ’s care for the whole person, the equal dignity of women and girls, sacramental touch, and hope beyond death.',
      eisegesisTrap:
        'Avoid blaming people who are not healed for lacking faith. Mark presents faith as vulnerable trust, not a technique that controls outcomes.',
      teacherNote:
        'Use a parallel chart to compare the unnamed woman and Jairus’s daughter.',
      media: [
        {
          id: 'mark5-two-daughters-motion', type: 'video', title: 'Two Daughters, One Movement of Restoration',
          instructionalPurpose: 'Compare interpretations', optional: true,
          description: 'See how Mark’s interruption connects Jairus’s daughter and the woman who has suffered for twelve years.',
          textAlternative: 'The animation begins with Jairus asking Jesus to help his daughter. A second line interrupts the journey as the woman reaches through the crowd and is healed. The shared detail of twelve years links the stories before both women are named as daughters within one movement of restoration. It ends with the insight that the delay makes room for another daughter.',
          beforeViewing: [{ id: 'interruption', prompt: 'Where does Mark interrupt Jairus’s story, and what changes during the delay?' }],
          afterViewing: [{ id: 'together', prompt: 'How does reading the two stories together change your understanding of faith, dignity, or restoration?' }],
          video: { src: 'media/mark5-two-daughters-motion.mp4', hosting: 'local', mimeType: 'video/mp4', silent: true, width: 1280, height: 720, poster: { src: 'media/mark5-two-daughters-poster.png', hosting: 'local' } },
          credit: { sourceName: 'HRE4M Remotion motion library', sourceUrl: 'media/mark5-two-daughters-motion.mp4', creator: 'HRE4M Interactive Learning Hub', licence: 'CC BY 4.0', licenceUrl: 'https://creativecommons.org/licenses/by/4.0/', attribution: 'Two Daughters, One Movement of Restoration by HRE4M Interactive Learning Hub, licensed CC BY 4.0.' },
        },
      ],
      exemplars: {
        literal:
          'Jairus asks Jesus to save his dying daughter. On the way, a woman suffering for twelve years touches Jesus and is healed; after news of the girl’s death, Jesus continues, takes her hand, and raises her.',
        allegorical:
          'Jesus crosses boundaries of impurity and death to restore God’s daughters. The girl’s rising points beyond healing toward Christ’s resurrection victory.',
        moral:
          'The passage calls communities to see people hidden by crowds or status, listen to their full truth, and remain present when delay deepens fear.',
        anagogical:
          'Healing and rising anticipate the resurrection, when exclusion, suffering, and death no longer hold God’s children.',
      },
    }),
    definePassage({
      id: 'mark-6-feeding',
      title: 'Compassion in a Deserted Place',
      reference: 'Mark 6:30–44',
      difficulty: 'Intermediate',
      estimatedMinutes: 18,
      anchorPhrase: 'Compassion turns a deserted place into a shared table.',
      contextNotes: [
        'The disciples return from mission tired, yet the crowd arrives before they can rest.',
        'Shepherd imagery and the actions over the bread echo Israel’s story and later Christian worship.',
      ],
      keyImages: ['shepherd', 'desert', 'groups', 'bread', 'baskets'],
      catholicConnection:
        'The feeding connects Eucharist, the Church’s responsibility for material hunger, communal order, and Christ’s compassionate shepherding.',
      eisegesisTrap:
        'Avoid separating spiritual nourishment from material need. Jesus teaches the crowd and feeds them, drawing the disciples into both tasks.',
      teacherNote:
        'Track the verbs Jesus gives the disciples and the actions he performs over the bread.',
      exemplars: {
        literal:
          'Jesus sees a large, hungry crowd and responds with compassion because they are like sheep without a shepherd. He involves the disciples, blesses the available food, and everyone eats with baskets left over.',
        allegorical:
          'Jesus is the shepherd who nourishes God’s people. The taking, blessing, breaking, and giving of bread also prepares readers to recognize Eucharistic meaning.',
        moral:
          'Disciples should let compassion interrupt convenience, organize shared care, and place limited resources at the service of others.',
        anagogical:
          'The satisfied crowd in a deserted place anticipates the abundant banquet of God’s fulfilled Kingdom.',
      },
    }),
    definePassage({
      id: 'mark-8-cross',
      title: 'Who Do You Say I Am?',
      reference: 'Mark 8:27–38',
      difficulty: 'Challenge',
      estimatedMinutes: 20,
      anchorPhrase: 'A correct title must be reshaped by the way of the Cross.',
      contextNotes: [
        'This scene is a turning point between Jesus’ Galilean ministry and the road toward Jerusalem.',
        'Peter names Jesus as Messiah but resists Jesus’ teaching about suffering, rejection, death, and resurrection.',
      ],
      keyImages: ['way', 'Messiah', 'Cross', 'life', 'following'],
      catholicConnection:
        'The passage is central to Christian discipleship, redemptive self-gift, the Paschal Mystery, and discerning the difference between sacrifice and harmful abuse.',
      eisegesisTrap:
        'Do not use “take up your cross” to tell people to remain in abuse or injustice. Jesus describes faithful self-gift, not passive acceptance of harm imposed by others.',
      teacherNote:
        'Distinguish naming Jesus accurately from understanding the kind of Messiah he is.',
      exemplars: {
        literal:
          'Peter identifies Jesus as Messiah, but then objects when Jesus predicts rejection, death, and resurrection. Jesus corrects him and teaches the crowd that discipleship requires self-denial and faithful following.',
        allegorical:
          'Jesus is the Messiah whose victory comes through the Paschal Mystery rather than domination. The Cross reveals God’s saving love and redefines power.',
        moral:
          'Disciples must let Jesus correct their expectations, resist self-centred definitions of success, and choose courageous service even when it costs something.',
        anagogical:
          'Losing life for Christ and the good news points toward receiving life in its fullness when the Son of Man comes in glory.',
      },
    }),
    definePassage({
      id: 'mark-9-transfiguration',
      title: 'Glory on the Mountain',
      reference: 'Mark 9:2–13',
      difficulty: 'Intermediate',
      estimatedMinutes: 17,
      anchorPhrase: 'A glimpse of glory strengthens the road toward suffering.',
      contextNotes: [
        'The Transfiguration follows the first prediction of the Passion and the call to carry the Cross.',
        'Moses, Elijah, cloud, mountain, and divine voice connect the scene with Israel’s Scriptures.',
      ],
      keyImages: ['mountain', 'radiance', 'cloud', 'voice', 'descent'],
      catholicConnection:
        'The feast of the Transfiguration joins Scripture, prayer, Christ’s divine glory, and the hope that sustains disciples on the way of the Cross.',
      eisegesisTrap:
        'Avoid treating spiritual experience as an escape from ordinary responsibility. The disciples must descend and continue the difficult journey.',
      teacherNote:
        'Ask how the scene answers the fear created by the previous teaching about the Cross.',
      exemplars: {
        literal:
          'Jesus takes Peter, James, and John up a mountain, where his appearance changes and Moses and Elijah appear. A voice identifies Jesus as the beloved Son and commands the disciples to listen.',
        allegorical:
          'The scene reveals Christ’s divine glory and presents him as the fulfillment of the Law and Prophets. Its placement joins glory inseparably to the coming Passion.',
        moral:
          'Disciples are called to listen to Christ, receive moments of clarity with gratitude, and carry that strength back into service and suffering.',
        anagogical:
          'Christ’s radiance anticipates resurrection and the transformation of creation in the presence of God.',
      },
    }),
    definePassage({
      id: 'mark-10-bartimaeus',
      title: 'Bartimaeus Sees the Way',
      reference: 'Mark 10:46–52',
      difficulty: 'Starter',
      estimatedMinutes: 13,
      anchorPhrase: 'A silenced voice becomes a disciple on the road.',
      contextNotes: [
        'The healing closes the long journey section immediately before Jesus enters Jerusalem.',
        'Bartimaeus is physically blind but recognizes Jesus and follows “on the way,” unlike disciples who repeatedly misunderstand.',
      ],
      keyImages: ['roadside', 'cloak', 'voice', 'sight', 'way'],
      catholicConnection:
        'Bartimaeus shapes prayer for mercy, baptismal sight, inclusive community, and discipleship that responds by following Jesus.',
      eisegesisTrap:
        'Do not make Bartimaeus merely a symbol and forget his dignity as a person who resists a crowd trying to silence him.',
      teacherNote:
        'Compare the crowd’s first action with its later action after Jesus stops.',
      exemplars: {
        literal:
          'Bartimaeus cries out to Jesus despite the crowd’s attempt to silence him. Jesus calls him, asks what he wants, restores his sight, and Bartimaeus follows on the road.',
        allegorical:
          'The restored sight represents recognition of Jesus and the movement into discipleship. Bartimaeus becomes a model of seeing who Jesus is before the Passion.',
        moral:
          'The story calls communities to hear marginalized voices, stop when others are silenced, and turn received mercy into active following.',
        anagogical:
          'Sight and following anticipate the final healing and clear vision of God promised in eternal life.',
      },
    }),
    definePassage({
      id: 'mark-15-16-ending',
      title: 'The Cross & the Open Ending',
      reference: 'Mark 15:21–16:8',
      difficulty: 'Challenge',
      estimatedMinutes: 27,
      anchorPhrase: 'A crucified king and an empty tomb leave the next response to the reader.',
      contextNotes: [
        'A Roman centurion’s confession at the Cross is a major moment of recognition.',
        'The earliest recoverable ending concludes with the women leaving the empty tomb in fear, creating an intentionally challenging effect.',
      ],
      keyImages: ['Cross', 'veil', 'centurion', 'stone', 'fear'],
      catholicConnection:
        'The passage centres the Paschal Mystery, Holy Week, courageous witness, Baptism into Christ’s death and resurrection, and hope stronger than fear.',
      eisegesisTrap:
        'Avoid blaming the Jewish people collectively for Jesus’ death, and do not mistake the women’s fear for the final failure of the Gospel’s mission.',
      teacherNote:
        'Let students experience the ending at 16:8, then ask what response Mark now demands from the reader.',
      exemplars: {
        literal:
          'Jesus is crucified, dies, and is buried. Women come to the tomb and find the stone moved and a messenger announcing that Jesus has been raised and will go ahead of the disciples to Galilee.',
        allegorical:
          'The crucified Jesus is revealed as God’s Son, and the torn veil signals opened access to God. The empty tomb announces that suffering love, not violence, has the final word.',
        moral:
          'The ending asks readers whether fear will silence them or whether they will continue the good news through faithful witness and return to discipleship.',
        anagogical:
          'Resurrection promises that death is not the end and that Christ goes ahead of his people toward the final restoration of life.',
      },
    }),
  ],
  quiz: [
    {
      id: 'mark-q1',
      statement: 'Mark’s repeated urgency helps readers feel the pressure of responding to the good news.',
      answer: 'Exegesis',
      feedback: 'This observation comes from Mark’s literary style and supports interpretation.',
    },
    {
      id: 'mark-q2',
      statement: 'The storm story promises that faithful people will never face danger.',
      answer: 'Eisegesis',
      feedback: 'The disciples face real danger; the story focuses on Jesus’ identity and presence within fear.',
    },
    {
      id: 'mark-q3',
      statement: 'Peter’s title for Jesus is correct, but his idea of Messiah still needs conversion.',
      answer: 'Exegesis',
      feedback: 'That tension drives the scene in Mark 8 and the journey that follows.',
    },
    {
      id: 'mark-q4',
      statement: '“Take up your cross” means a person must remain in an abusive relationship.',
      answer: 'Eisegesis',
      feedback: 'This harmful use ignores Jesus’ challenge to domination and confuses faithful self-gift with imposed abuse.',
    },
    {
      id: 'mark-q5',
      statement: 'Bartimaeus’s position at the end of the journey section helps Mark contrast sight with misunderstanding.',
      answer: 'Exegesis',
      feedback: 'Literary placement and repeated themes are appropriate evidence for interpretation.',
    },
  ],
  sortingActivity: [
    { id: 'mark-s1', text: 'Friends lower a paralyzed man through a roof, and Jesus heals him.', answer: 'Literal' },
    { id: 'mark-s2', text: 'The healing reveals Christ’s authority to forgive and restore the whole person.', answer: 'Allegorical' },
    { id: 'mark-s3', text: 'Communities should remove barriers that keep vulnerable people from care.', answer: 'Moral' },
    { id: 'mark-s4', text: 'The man rising anticipates the resurrection of the whole person.', answer: 'Anagogical' },
    { id: 'mark-s5', text: 'Bartimaeus calls out, receives sight, and follows Jesus on the road.', answer: 'Literal' },
    { id: 'mark-s6', text: 'Restored sight represents recognition that leads into discipleship.', answer: 'Allegorical' },
    { id: 'mark-s7', text: 'The crowd must learn to hear a person it first tried to silence.', answer: 'Moral' },
    { id: 'mark-s8', text: 'Clear sight points toward final healing and vision of God.', answer: 'Anagogical' },
  ],
};
