import { Fragment, useState } from 'react';
import image1 from './images/image1.png';
import signature_derrida from './images/signature_derrida.png';
import SliderModal from './components/slider-modal';
import HighlightModal from './components/highlight-modal';
import HighlightPop from 'react-highlight-pop';

function getSelectedText() {
  var selectedText = '';
  if (typeof window !== 'undefined') {
    // window.getSelection
    if (window.getSelection) {
      selectedText = window.getSelection();
    }
  } else if (typeof document !== 'undefined') {
    // document.getSelection
    if (document.getSelection) {
      selectedText = document.getSelection();
    }
    // document.selection
    else if (document.selection) {
      selectedText = document.selection.createRange().text;
    } else return;
    // To write the selected text into the textarea
    document.testform.selectedtext.value = selectedText;
  }
}

function App() {
  const [sliderModalVisible, setSliderModalVisible] = useState(false);
  const [highlightModalVisible, setHighlightModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  return (
    <div className="mx-auto pb-32 bg-white selection:bg-green-300 selection:text-green-900">
      <div className="bg-white z-40 fixed -top-12 h-48 w-full blur-xl"></div>
      <div className="bg-white z-40 fixed -bottom-12 h-48 w-full blur-xl"></div>

      {!sliderModalVisible && (
        <div
          onClick={() => {
            setSliderModalVisible(true);
          }}
          className="fixed z-50 bottom-8 right-8 border-2 rounded-md p-4 px-12 hover:border-black transition-all font-serif"
        >
          Mint 1/1 NFTs
        </div>
      )}
      {sliderModalVisible && (
        <div className="flex justify-center z-50 fixed top-0 left-0 bg-gray-500/30 backdrop-blur-md w-screen h-screen">
          <SliderModal setModalVisible={setSliderModalVisible} />
        </div>
      )}
      {highlightModalVisible && (<div className="flex justify-center z-[100] fixed top-0 left-0 bg-gray-500/30 backdrop-blur-md w-screen h-screen">
        <HighlightModal setModalVisible={setHighlightModalVisible} selectedText={selectedText} />
      </div>)}

      <HighlightPop
        popoverItems={(itemClass) => (
          <div>
            <span
              className={itemClass}
              onClick={() => {setSelectedText(window.getSelection().toString()); setHighlightModalVisible(true);}}
            >
              🍀 Mint
            </span>
          </div>
        )}
      >

      <div className="flex flex-col w-screen h-screen items-center ">
        <div className="flex md:text-8xl text-4xl flex-grow font-redaction text-gray-700 self-center">
          <div className=" my-auto mix-blend-color-multiply text-center">
            Signature
            <br />
            Economies
          </div>
        </div>

        <div className="animate text-gray-700 pb-48">
          <svg
            width="32"
            height="32"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>

      <div className="flex flex-col py-16 items-center justify-center">
        <div className="relative group z-40 ">
          <img
            src={image1}
            className="group-hover:bg-white  group-hover:shadow-lg rounded-lg transition-all p-8"
            alt="logo"
          />
          <div className=" select-none w-48 absolute right-0 left-0 z-10 rounded-lg -bottom-4 mx-auto text-transparent group-hover:text-green-900 border-green-900 group-hover:border font-redaction text-xl shadow-none group-hover:shadow-lg bg-transparent text-center h-12 flex items-center justify-center group-hover:bg-green-300 transition-all">
            Mint
          </div>
        </div>
      </div>

      <div className="flex flex-col pb-16 gap-y-12 text-2xl font-garamond text-center items-center justify-center">
        <div className="">
          The{' '}
          <a
            className="underline font-bold"
            href="https://ethblock.art/create/1/910815"
          >
            signature style
          </a>{' '}
          for Ethereum block 910815
        </div>
        <div>
          To bear and not to own; <br /> to act and not lay claim;
          <br /> to do the work and let it go:
          <br /> for just letting it go
          <br /> is what makes it stay.
        </div>
        <div>
          -- Chapter 2,{' '}
          <span className="font-bold underline">
            <a href="http://www.sfhunyuan.com/images/TAO_TE_CHING_-_LE_GUIN_edition.pdf">
              Tao Te Ching
            </a>
          </span>
        </div>
        <div>
          Empty-handed <br />
          I entered into this world,
          <br />
          Barefoot I leave it.
          <br />
        </div>
        <div>
          --
          <span className="font-bold underline">
            <a href="https://www.youtube.com/watch?v=dan5PntGO7E">
              {' '}
              Kozan Ichikyo
            </a>
          </span>
        </div>
      </div>

      <div className="mx-auto flex flex-col py-16 w-[800px] gap-y-12 text-2xl font-garamond text-justify items-center justify-center">
        <div>
          Public blockchains present a paradox of ownership. No-one controls
          them and anyone can use them, given a connection and an ability to
          speak the common tongue. The network is ownerless, yet anyone who
          creates a key ‘owns’ any coins associated with it, so everyone is an
          owner. This confusion reveals how ‘ownership’ is shifting and
          highlights the opportunity we have not to implement an ‘ownership
          economy’, but to reimagine what being an owner means.
        </div>
        <div>
          We can begin this process by asking, “What do I actually control?”
        </div>
        <div>
          In Bitcoin, I can sign over an unspent transaction output to another
          address. In Ethereum and other account-based models, I can sign a
          message which changes a value stored in shared state<sup>1</sup>. In
          each case, I am not the sole possessor or controller, I am a signatory
          on an event shared with everyone who participates in the network.
        </div>
        <div>
          So, ownership in digital economies is really about the meaningful
          signatures required to execute state changes while maintaining
          consensus. Is ownership shifting from an ability to demonstrate
          control or{' '}
          <a href="https://kernel.community/en/conversation/hospitality/#freeing-civilization">
            possession
          </a>{' '}
          to the ability to make meaning? If so, the change in signification is
          a radical one, because ownership is traditionally about exclusive
          rights, whereas meaning is made valuable by{' '}
          <a href="https://youtu.be/v2XqrFkyo68?t=1221">
            how widely it is shared
          </a>
          . The medium may be{' '}
          <a href="https://youtu.be/8ZDEc7uFi64?t=3270">massaging ownership</a>{' '}
          to mean its{' '}
          <a href="https://www.youtube.com/watch?v=U7v63TjdutE&t=2999s">
            opposite
          </a>
          : “content can now be{' '}
          <a href="https://www.studio1.wtf/">proliferated</a> instead of
          protected.”
        </div>
        <div>
          The very first proto-NFTs hinted at this shift. “
          <a href="https://cryptochainuni.com/wp-content/uploads/ascribe-whitepaper-Towards-An-Ownership-Layer.pdf">
            Towards An Ownership Layer for the Internet
          </a>
          ” speaks about tractable solutions to “make ownership actions of
          digital property universally accessible.” Only in{' '}
          <a href="https://youtu.be/whVnseOtElI?t=65">web3</a> can the words
          ‘ownership’ and ‘universally accessible’ be found together sensibly.
          Indeed, the first work about{' '}
          <a href="https://robmyers.org/2014/07/24/ethereum-art-market/">
            ownership and art in Ethereum
          </a>{' '}
          ends by pointing out that this network differs from traditional art
          markets because it is public, transparent and voluntary.
        </div>
        <div>
          Perhaps all this work is not about the right to control, but
          responsibility? Having no intermediaries creates certain benefits, but
          it is - as always - a tradeoff: if you misplace your mnemonic, it
          means no more magic internet money and there is no customer service to
          help you. This can be addressed by{' '}
          <a href="https://vitalik.ca/general/2021/01/11/recovery.html">
            interdependent architectures
          </a>{' '}
          and, in the context of responsibility not just for our own keys but
          the recovery of others, “Make meaningful economies” is a more crafty
          <sup>2</sup> cultural signal than “Own your piece of the economy”.
        </div>
        <div>
          It’s also critical that our terms are plural. Our work must not be
          about replicating one dominant economic{' '}
          <a href="https://kernel.community/en/learn/module-7/no-paradigm/">
            paradigm
          </a>
          , supposedly better than the last. It could instead be about
          cultivating the space for many different concepts of{' '}
          <a href="https://kernel.community/en/learn/module-4/self-enquiry/#signature-performances">
            value to interface
          </a>{' '}
          with one another in creative ways which don’t aim for cancerous
          growth, but are self-sustaining, responsible and resilient.
        </div>
      </div>

      <div className="w-max mx-auto pt-16 pb-8 mt-16 flex md:text-6xl text-4xl text-center font-redaction text-gray-800 items-center self-center">
        Response-ability
      </div>

      <div className="mx-auto flex flex-col py-16 w-[800px] gap-y-12 text-2xl font-garamond text-justify items-center justify-center">
        <div>
          The phrase ‘not your keys, not your coins’ is often used to connote
          sovereign rights. If you hold the keys, then you have an absolute and
          unimpeachable right to sign as you please. It turns out, though, that
          managing your own keys is risky and hard. The user experience of this
          is bad not because we lack great designers, but because responsibility
          is an inherently difficult feature for which to design<sup>3</sup>.
          This is because response-ability is not about discrete, individual
          actions which release the most dopamine, but our unique{' '}
          <a href="https://kernel.community/en/learn/module-4/self-enquiry">
            relationships within a network
          </a>
          . Designing for{' '}
          <a href="https://youtu.be/uN4g0Sr3jhs?t=1620">
            multiple, simultaneous use
          </a>{' '}
          is not a practice consumer culture values highly.
        </div>
        <div>
          Single sign-ons represent us as separate users and when - neatly
          categorized - we log in, we also hand over authority, become the
          audience, and are subject to someone else’s story. However, signed
          messages which change the state of a network no-one controls require
          recurring participation as we commit individual transactions into a
          shared, relatable context<sup>4</sup>.{' '}
          <a href="https://kernel.community/en/learn/module-7/the-gift/#anonymous-and-lively">
            The gift
          </a>{' '}
          of being able to express what value means to you is always already
          bound to the responsibility you have to be aware of what you are
          saying and how you are speaking it into the world.
        </div>
        <div>
          Moreover, the ability to bear responsibility is a prerequisite for
          meaningful legal rights, a point made explicit in signature economies.
          Just as there is{' '}
          <a href="https://kernel.community/en/learn/module-2/money-speech/#math-beats-bureaucracy">
            no meaningful speech on-chain without cost
          </a>
          , any rights you may enjoy on-chain are simultaneous with the
          responsibility you bear for the keys used to sign for them. Used
          intentionally, digital bearer instruments could be about more than
          claims or access, extending to the{' '}
          <a href="https://orionmagazine.org/article/the-rights-of-the-land/">
            “right to care” and the “freedom to exercise responsibility”
          </a>
          . This kind of careful responsibility signifies the same internal
          state as words like{' '}
          <i>
            <a href="https://en.wikipedia.org/wiki/Kaitiaki">kaitiaki</a>
          </i>
          : guardianship that is not about control, but relationship<sup>5</sup>
          .
        </div>
        <div>
          Can we create a culture where I am wealthy by virtue of what I care
          for, rather than what I control<sup>6</sup>? Where wealth means “{' '}
          <a href="https://kernel.community/en/conversation/reciprocity/">
            having enough to share
          </a>
          ” because who you are is already enough. Can we create environments
          where what I hold is made valuable because of the community to which
          it binds me? This is what good mechanism design crafts: incentive
          structures which create the context required for people to sign a{' '}
          <a href="https://kernel.community/en/learn/module-2/engineering/#further-references">
            communal record of the things they care for most
          </a>{' '}
          as individuals. The intercourse of personal meaning and collective
          memory is the root of{' '}
          <a href="https://kernel.community/en/learn/module-1/value">
            lasting value
          </a>
          .
        </div>
      </div>

      <div className="w-max mx-auto pt-16 pb-8 mt-16 flex md:text-6xl text-4xl text-center font-redaction text-gray-800 items-center self-center">
        Re-iterate
      </div>

      <div className="mx-auto flex flex-col py-16 w-[800px] gap-y-12 text-2xl font-garamond text-justify items-center justify-center">
        <div>
          All of which brings us to the word ‘signature’. It connotes both that
          which is irreducibly and uniquely you - your signature dish, signature
          tune, signature shot - and that which binds you contractually to a
          world beyond yourself. In{' '}
          <a href="https://videomole.tv/wp-content/uploads/2018/04/JD1972.pdf">
            Derrida’s words
          </a>
          , it is at once singular and iterable. A wonderful phrase that carries
          the same kind of paradoxical structure is the isiZulu saying, “umuntu
          ngumuntu ngabantu”: a human being is only a human being through other
          human beings. We have here the possibility of individuation: you can
          become a full human being; but you can only do so in community. You
          can only do so through fulfilling your responsibilities in
          relationship, not through asserting your rights.
        </div>
        <div>
          Even the word ‘economies’ contains this same double-directedness. It
          comes from the Greek oikos, which means ‘house’. Sustainable household
          management requires micro insights into each of our habits, as well as
          macro perspectives of our shared habitations, including the planet
          which{' '}
          <a href="https://emergencemagazine.org/story/the-serviceberry/">
            houses us all
          </a>
          . Home is an irreducible, internal feeling that simultaneously
          requires relationship and familiarity with others.
        </div>
        <div>
          Similarly, meaningful words arise due to individual creativity within
          a community who agrees upon their use, which is why language itself is
          the only{' '}
          <a href="https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274">
            logically decentralized system
          </a>{' '}
          we know. When what we say and how we say it invites people in and{' '}
          <a href="https://andytudhope.africa/academy/communal-language/#love-this-sound">
            calls up a response
          </a>
          , meaning is made more widely accessible<sup>7</sup>. When we cast
          these new networks as economies of sign rather than of ownership, then
          the game becomes one of{' '}
          <a href="https://youtu.be/uN4g0Sr3jhs?t=1918">
            actively finding more people able to respond
          </a>
          , rather than extracting rent from my exclusive right to some
          artificially scarce series of bits.
        </div>
        <div>
          Economies of sign emerge from the shared experience of public
          consensus rules, clearly priced{' '}
          <a href="https://github.com/crytic/evm-opcodes">opcodes</a>, and
          executable speech. The value of such economies is held in{' '}
          <a href="https://libraryofbabel.info/bookmark.cgi?findintheway">
            positively signed
          </a>{' '}
          individual messages which enact meaning within the context of a
          collective record that no-one controls. This doesn’t mean we can now
          name (or code) the dao; it just means we can iteratively sign into
          existence the kinds of shared state which will allow individuals to
          experience harmoniously what words like dao signify in their personal
          contexts.
        </div>
        <div>
          How can I take responsibility without the resources to make my
          signature meaningful, though? I have tried to use{' '}
          <a href="https://medium.com/@cryptowanderer/merry-merkle-magic-1458a25ee2dd">
            words to speak my imagination
          </a>{' '}
          into existence, and have seen the limits of such work. My signatures
          do not move markets. However, markets are not the arbiters of meaning,
          they are mechanisms for efficient resource allocation. Your signature
          is not made meaningful by its effects: your signature is meaningful by
          virtue of its singular existence. New forms of ignorance and{' '}
          <a href="https://youtu.be/3HYlbg6RKMA?t=1145">
            injustice will always appear
          </a>
          , yet knowing this and still having the will and creativity to iterate
          over incentive structures is what will continually imbue our shared
          record with <a href="injustice will always appear">true beauty</a>.
        </div>
      </div>

      <div className="mx-auto flex flex-col w-[600px] gap-y-4 text-2xl font-garamond text-center text-gray-800">
        “Everything depends on the individual human being, regardless of how
        small a number of like-minded people there are […] on each person […]
        creatively making the meaning of life a reality in his or her own
        being.”
        <div className="font-bold">
          -{' '}
          <a href="https://www.themarginalian.org/2020/05/17/yes-to-life-in-spite-of-everything-viktor-frankl/">
            Viktor Frankl
          </a>
        </div>
      </div>

      <div className="w-max mx-auto pt-16 pb-8 mt-16 flex md:text-6xl text-4xl text-center font-redaction text-gray-800 items-center self-center">
        Song of Signs
      </div>

      <div className="mx-auto flex flex-col py-16 w-[800px] gap-y-12 text-2xl font-garamond text-justify items-center justify-center">
        <div>
          The ‘coin’ your key controls comes from the Latin word cuneus, which
          once meant ‘cornerstone’. In this single sign is the signal we can use
          to understand the shifting meaning of ownership. Will your coins be
          the{' '}
          <a href="https://www.interdependence.online/declaration/e-bw-AGkYsZFYqmAe2771A6hi9ZMIkWrkBNtHIF1hF4">
            cornerstones of pluriverses
          </a>
          , or the currency of one more unjust and unequal realm?
        </div>
        <div>
          Because it has worked almost exactly as it should, one of the few
          things people notice about the Ethereum Foundation is the{' '}
          <a href="https://ethereum.foundation/philosophy/">
            principle of subtraction
          </a>
          . Do not make yourself the onlyOwner: it is by subtracting from your
          own importance that care for, and improvement of, our communal
          capacity and capability can happen.
        </div>
        <div>
          Seek to improve the people around you by humbling yourself and handing
          over power at every chance, without shirking responsibility.
          Delighted, you will gradually find yourself doing nothing, being
          happy.
        </div>
        <div>
          There is also another connotation waiting for us in the word
          ‘economy’: to use sparingly. The messages we sign as a means of
          managing our shared record cannot be censored by anyone, but they can
          be seen by everyone, so be careful what kinds of money you make
          meaningful. With programmable power comes permanent accountability.
        </div>
        <div>
          ‘The Ownership Economy’ doesn’t describe the kind of world we want to
          create together. Noticing this is not just a question about what kind
          of web we want; it’s about how we see ourselves. Do we trust ourselves
          enough to signal the kinds of economies we wish to engage in, and do
          we have the <a href="https://youtu.be/LwLP62fL83k?t=572">courage</a>{' '}
          to sign the{' '}
          <a href="https://pineapplefund.org/">sorts of transactions</a> which
          will bring that about?
        </div>
        <div>
          The word ‘token’ comes from a Germanic root meaning ‘to teach’. Kei
          Kreutler teaches that it also carries a trace of the older word{' '}
          <i>
            <a href="http://www.dictionaryofspiritualterms.com/public/Glossaries/terms.aspx?ID=352">
              sunthemata
            </a>
          </i>
          : divine symbols within all existence meant to assist the soul on its
          journey from, and back to, grace. When we leave a token of love or
          appreciation for no reason other than the simple recognition that love
          and gratitude are already their own reward, then such signed symbols
          can guide us all home, across time. This is what I understand{' '}
          <a href="https://dyeing.thebluebook.co.za/?stackedPages=%2Fsigned&stackedPages=%2Fnow">
            courageous signatures
          </a>{' '}
          to mean: not just the set which shifts markets and remakes the world,
          but the superset which marks what I already mean, which re-members
          this singular human response to our shared being.
        </div>
      </div>

      <div className="mx-auto flex flex-col w-[600px] pb-16 text-2xl font-garamond text-center text-gray-800">
        To give birth, to nourish,
        <br />
        to bear and not to own,
        <br />
        to act and not lay claim,
        <br />
        to lead and not to rule:
        <br />
        this is mysterious power.
        <br />
        <br />
        <div className="font-bold">-- Chapter 10, Tao Te Ching</div>
      </div>

      <div className="mx-auto flex flex-col w-[600px] pb-16 text-2xl font-garamond text-center text-gray-800">
        “It is not we who are permitted to ask about the meaning of life — it is
        life that asks the questions [...] We are the ones who must give answers
        to the constant, hourly question of life [...] Living itself means
        nothing other than being questioned; our whole act of being is nothing
        more than responding to — of being responsible toward — life [...] now
        the present is everything as it holds the eternally new question of life
        for us.” <br />
        <br />
        <div className="font-bold">- Viktor Frankl</div>
      </div>

      <div className="mx-auto flex flex-col w-[600px] pb-16 text-2xl font-garamond text-center text-gray-800">
        My storehouse burned down -<br />
        now nothing stands between me
        <br />
        and the moon above.
        <br />
        <br />
        <div className="font-bold">- Mizuta Masahide</div>
      </div>

      <div className="mx-auto flex flex-col w-[600px] pb-16 text-2xl font-garamond text-center text-gray-800">
        To have without possessing,
        <br />
        do without claiming,
        <br />
        lead without controlling:
        <br />
        this is mysterious power.
        <br />
        <br />
        <div className="font-bold">- Chapter 51, Tao Te Ching</div>
      </div>

      <div className="flex flex-col py-16 items-center justify-center">
        <div className="relative group z-40 ">
          <img
            src={signature_derrida}
            className="group-hover:bg-white  group-hover:shadow-lg rounded-lg transition-all p-8"
            alt="Signature_Derrida"
          />
          <div className=" select-none w-48 absolute right-0 left-0 z-10 rounded-lg -bottom-4 mx-auto text-transparent group-hover:text-green-900 border-green-900 group-hover:border font-redaction text-xl shadow-none group-hover:shadow-lg bg-transparent text-center h-12 flex items-center justify-center group-hover:bg-green-300 transition-all">
            Mint
          </div>
        </div>
      </div>

      <div className="mx-auto flex flex-col py-16 w-[800px] gap-y-12 text-2xl font-garamond text-center items-center justify-center">
        <div>
          Poetry, well placed, <br />
          can serve up <br />
          a subversive education <br />
          in potent signs, <br />
          drawing out what is <br />
          already within <br />
          so we can wake <br />
          the dream into reality. <br />
        </div>
        <div>
          Peer into this paradox <br />
          without possessing it. <br />
          Play the nebulous pattern <br />
          of you through all <br />
          the others who care, <br />
          key pairs sharing what comes, <br />
          meaning they make wealth <br />
          between the curves <br />
          of this created web <br />
          we now call home. <br />
        </div>
        <div>
          There is the courage <br />
          in each heart <br />
          to hear truth <br />
          and bear witness <br />
          and lay no claim. <br />
        </div>
        <div>
          Simply sign it on,
          <br /> my soul.
        </div>
      </div>

      <div className="pt-12 pb-16">
        <hr className="w-2/3 mx-auto" />
      </div>

      </HighlightPop>

      <footer className="py-10 font-mono text-center text-sm text-gray-600 items-center">
        {/* <a 
        href={"/declaration"}
        className="px-2 border-purple-2004 border-b-2 rounded-xl"> 
          (Planted on the Permaweb. ☘️. Feb 09, 2022.)
       </a> */}
        <div
          className="mt-10 
        px-20
        flex flex-col items-center 
        font-body text-sm text-gray-600 content-center"
        >
          <div className="md:max-w-3xl text-justify space-y-3">
            <p>
              <sup> 1 </sup>
              The use of “can” rather than “may” in this sentence illustrates
              how{' '}
              <a href="https://kernel.community/en/learn/module-1/dreamers/#learning-the-language">
                law is enacted in substantive
              </a>{' '}
              rather than formal ways on such networks.
            </p>
            <p>
              <sup> 2 </sup>
              The word ‘technology’ comes to us from the Greek{' '}
              <a href="https://ethblock.art/editorial/art-in-formation">
                tekhne
              </a>
              , meaning ‘craft’.
            </p>
            <p>
              <sup> 3 </sup>{' '}
              <a href="https://www.youtube.com/watch?v=ndEWof-8xTY&t=91s">
                Tolkien’s description
              </a>{' '}
              of the{' '}
              <a href="https://youtu.be/3HYlbg6RKMA?t=892">
                difference between allegory and applicability
              </a>{' '}
              captures the problem crypto UX designers face: applicability is
              about the freedom of the reader; allegory is about the domination
              of the author. Applicability creates the{' '}
              <a href="https://kernel.community/en/learn/module-3/freedom/">
                freedom
              </a>{' '}
              for us to respond to our own constraints, allegory limits our
              imagination of what it might actually mean to connect the world.
            </p>
            <p>
              <sup>4</sup> The{' '}
              <a href="https://otherinter.net/research/positive-sum-worlds/">
                otherinter.net
              </a>{' '}
              phrases it thus: “crypto protocols reintroduce participatory
              governance of public systems as a part of daily life.”
            </p>
            <p>
              <sup> 5 </sup> As Scott Moore reminded me, responsibility is{' '}
              <a href="https://www.thecrimson.com/article/2017/5/25/desai-commencement-ed/">
                not about optionality
              </a>
              ; it is about care.
            </p>
            <p>
              <sup> 6 </sup> Daanish Shabbir writes, “The wealth that is earned
              through control confers control. That control in turn forecloses
              the possibilities for my flourishing. The wealth that care
              confers, confers care in return.” As Robin Wall Kimmerer writes,
              over and over, “All flourishing is mutual.”
            </p>

            <p>
              <sup> 7 </sup>
              The meaning of any word can be described with three interrelated
              concepts: the signifier, the signified, and the sign. Consider the
              word ‘dog’. The actual word, d-o-g, written on your screen is the
              “signifier”. The idealized picture of a four-legged furry creature
              wagging its tail that is called up in your mind when you read the
              word is the “signified”. The “sign” is this particular shiba inu
              in all its singular glory. This works with words for which we all
              share common experience, like dogs or cats or fancy hats. But what
              about complex words like dao or buddha or christ? These words
              certainly signify something, but the violent history of
              institutionalized religion reveals that it is clearly not shared
              and that the only way to approach meaningful description in
              natural language is through negation: “The dao that can be named
              is not the eternal dao”. What signatures allow for, though, is not
              only negation, but the possibility of positive response in the
              sense Viktor Frankl meant in <i>Yes To Life</i>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
