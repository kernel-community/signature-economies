import HeadComponent from "../components/Head";
import React, { Fragment, useRef, useState } from 'react'
import HighlightPop from 'react-highlight-pop';
import Modal from "react-modal";
import Image from "next/image";
import Button from "../components/core/Button";
import Box from "../components/core/Box";
import SelectedTextNFT from "../components/SelectedTextNFT";


export default function SignatureEconomies() {

  const [NFTmodalIsOpen, setIsOpen] = React.useState(false);
  const [selectedText, setSelectedText] = React.useState("");

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
    <div>
      <HeadComponent/>
      <div
        className="flex flex-col items-center flex-1                
                      px-4
                      sm:px-5
                      md:px10 
                      lg:px-40
                      py-20 
                      text-center"
      >
        <div className="flex w-full mb-8 sm:mb-0 ">
            <div className="hidden sm:block flex-1">
            </div>
            <div className="flex-0 w-full flex justify-center sm:justify-end">
            </div>
          </div>
        <HighlightPop
          popoverItems={itemClass => (
            <Fragment>
              <span className={itemClass} onClick={() => {
                openModal()
                setSelectedText(window.getSelection().toString())}}>
                🍀  Mint  
              </span>
            </Fragment>)}>       
        <SelectedTextNFT 
          isOpen={NFTmodalIsOpen}
          closeModal={closeModal}
          selectedText={selectedText}/>
        <h2 className="mt-20 text-3xl font-title w-full font-bold px-20 text-center">
          Signature Economies
        </h2>
        <div
          className="mt-10 
            font-body 
            text-2xl
            text-left 
            text-opacity-75 
            space-y-7
            max-w-4xl 
            px-5
            md:px-10"
        >
          <img src="/signature_block.png" alt="Signature style from Block 910815"/>

          <p style={{'font-size': '18px', 'text-align': 'center'}}>
            The <a href="https://ethblock.art/create/1/910815">signature style</a> for Ethereum block 910815
          </p>

          <p className="poetry">
            To bear and not to own;<br/>
            to act and not lay claim;<br/>
            to do the work and let it go:<br/>
            for just letting it go<br/>
            is what makes it stay.<br/>
            <br/>
            -- Chapter 2, <a href="http://www.sfhunyuan.com/images/TAO_TE_CHING_-_LE_GUIN_edition.pdf">Tao Te Ching</a>
          </p>

          <p className="poetry">
            Empty-handed<br/>
            I entered into this world,<br/>
            Barefoot I leave it.<br/>
            <br/>
            -- <a href="https://www.youtube.com/watch?v=dan5PntGO7E">Kozan Ichikyo</a>
          </p>
          
          <p style={{'text-indent': '2rem'}}>
            Public blockchains present a paradox of ownership. No-one controls them and anyone can use them, given a connection and an ability to speak the common tongue. The network is ownerless, yet anyone who creates a key ‘owns’ any coins associated with it, so everyone is an owner. This confusion reveals how ‘ownership’ is shifting and highlights the opportunity we have not to implement an ‘ownership economy’, but to reimagine what being an owner means.
          </p>


          <p style={{'text-indent': '2rem'}}>
            We can begin this process by asking, “What do I actually control?”
          </p>

          <p style={{'text-indent': '2rem'}}>
            In Bitcoin, I can sign over an unspent transaction output to another address. In Ethereum and other account-based models, I can sign a message which changes a value stored in shared state<sup>1</sup>. In each case, I am not the sole possessor or controller, I am a signatory on an event shared with everyone who participates in the network.
          </p>

          <p style={{'text-indent': '2rem'}}>
            So, ownership in digital economies is really about the meaningful signatures required to execute state changes while maintaining consensus. Is ownership shifting from an ability to demonstrate control or <a href="https://kernel.community/en/conversation/hospitality/#freeing-civilization">possession</a> to the ability to make meaning? If so, the change in signification is a radical one, because ownership is traditionally about exclusive rights, whereas meaning is made valuable by <a href="https://youtu.be/v2XqrFkyo68?t=1221">how widely it is shared</a>. The medium may be <a href="https://youtu.be/8ZDEc7uFi64?t=3270">massaging ownership</a> to mean its <a href="https://www.youtube.com/watch?v=U7v63TjdutE&t=2999s">opposite</a>: “content can now be <a href="https://www.studio1.wtf/">proliferated</a> instead of protected.”
          </p>

          <p style={{'text-indent': '2rem'}}>
            The very first proto-NFTs hinted at this shift. “<a href="https://cryptochainuni.com/wp-content/uploads/ascribe-whitepaper-Towards-An-Ownership-Layer.pdf">Towards An Ownership Layer for the Internet</a>” speaks about tractable solutions to “make ownership actions of digital property universally accessible.” Only in <a href="https://youtu.be/whVnseOtElI?t=65">web3</a> can the words ‘ownership’ and ‘universally accessible’ be found together sensibly. Indeed, the first work about <a href="https://robmyers.org/2014/07/24/ethereum-art-market/">ownership and art in Ethereum</a> ends by pointing out that this network differs from traditional art markets because it is public, transparent and voluntary.
          </p>

          <p style={{'text-indent': '2rem'}}>
            Perhaps all this work is not about the right to control, but responsibility? Having no intermediaries creates certain benefits, but it is - as always - a tradeoff: if you misplace your mnemonic, it means no more magic internet money and there is no customer service to help you. This can be addressed by <a href="https://vitalik.ca/general/2021/01/11/recovery.html">interdependent architectures</a> and, in the context of responsibility not just for our own keys but the recovery of others, “Make meaningful economies” is a more crafty<sup>2</sup> cultural signal than “Own your piece of the economy”.
          </p>

          <p style={{'text-indent':'2rem'}}>
            It’s also critical that our terms are plural. Our work must not be about replicating one dominant economic <a href="https://kernel.community/en/learn/module-7/no-paradigm/">paradigm</a>, supposedly better than the last. It could instead be about cultivating the space for many different concepts of <a href="https://kernel.community/en/learn/module-4/self-enquiry/#signature-performances">value to interface</a> with one another in creative ways which don’t aim for cancerous growth, but are self-sustaining, responsible and resilient.
          </p>

          <h2 className="pt-10 text-3xl font-title w-full px-20 text-center">
            Response-ability
          </h2>

          <p style={{'text-indent': '2rem'}}> 
            The phrase ‘not your keys, not your coins’ is often used to connote sovereign rights. If you hold the keys, then you have an absolute and unimpeachable right to sign as you please. It turns out, though, that managing your own keys is risky and hard. The user experience of this is bad not because we lack great designers, but because responsibility is an inherently difficult feature for which to design<sup>3</sup>. This is because response-ability is not about discrete, individual actions which release the most dopamine, but our unique <a href="https://kernel.community/en/learn/module-4/self-enquiry">relationships within a network</a>. Designing for <a href="https://youtu.be/uN4g0Sr3jhs?t=1620">multiple, simultaneous use</a> is not a practice consumer culture values highly.
          </p>

          <p style={{'text-indent': '2rem'}}>
            Single sign-ons represent us as separate users and when - neatly categorized - we log in, we also hand over authority, become the audience, and are subject to someone else’s story. However, signed messages which change the state of a network no-one controls require recurring participation as we commit individual transactions into a shared, relatable context<sup>4</sup>. <a href="https://kernel.community/en/learn/module-7/the-gift/#anonymous-and-lively">The gift</a> of being able to express what value means to you is always already bound to the responsibility you have to be aware of what you are saying and how you are speaking it into the world.
           </p>

          <p style={{'text-indent': '2rem'}}>
            Moreover, the ability to bear responsibility is a prerequisite for meaningful legal rights, a point made explicit in signature economies. Just as there is <a href="https://kernel.community/en/learn/module-2/money-speech/#math-beats-bureaucracy">no meaningful speech on-chain without cost</a>, any rights you may enjoy on-chain are simultaneous with the responsibility you bear for the keys used to sign for them. Used intentionally, digital bearer instruments could be about more than claims or access, extending to the <a href="https://orionmagazine.org/article/the-rights-of-the-land/">“right to care” and the “freedom to exercise responsibility”</a>. This kind of careful responsibility signifies the same internal state as words like <i><a href="https://en.wikipedia.org/wiki/Kaitiaki">kaitiaki</a></i>: guardianship that is not about control, but relationship<sup>5</sup>.
          </p>
          
          <p style={{'text-indent': '2rem'}}>
            Can we create a culture where I am wealthy by virtue of what I care for, rather than what I control<sup>6</sup>? Where wealth means “<a href="https://kernel.community/en/conversation/reciprocity/">having enough to share</a>” because who you are is already enough. Can we create environments where what I hold is made valuable because of the community to which it binds me? This is what good mechanism design crafts: incentive structures which create the context required for people to sign a <a href="https://kernel.community/en/learn/module-2/engineering/#further-references">communal record of the things they care for most</a> as individuals. The intercourse of personal meaning and collective memory is the root of <a href="https://kernel.community/en/learn/module-1/value">lasting value</a>.
          </p>

          <h2 className="pt-10 text-3xl font-title w-full px-20 text-center">
            Re-iterate
          </h2>

          <p style={{'text-indent': '2rem'}}>
            All of which brings us to the word ‘signature’. It connotes both that which is irreducibly and uniquely you - your signature dish, signature tune, signature shot - and that which binds you contractually to a world beyond yourself. In <a href="https://videomole.tv/wp-content/uploads/2018/04/JD1972.pdf">Derrida’s words</a>, it is at once singular and iterable. A wonderful phrase that carries the same kind of paradoxical structure is the isiZulu saying, “umuntu ngumuntu ngabantu”: a human being is only a human being through other human beings. We have here the possibility of individuation: you can become a full human being; but you can only do so in community. You can only do so through fulfilling your responsibilities in relationship, not through asserting your rights.
          </p>

          <p style={{'text-indent': '2rem'}}>
            Even the word ‘economies’ contains this same double-directedness. It comes from the Greek oikos, which means ‘house’. Sustainable household management requires micro insights into each of our habits, as well as macro perspectives of our shared habitations, including the planet which <a href="https://emergencemagazine.org/story/the-serviceberry/">houses us all</a>. Home is an irreducible, internal feeling that simultaneously requires relationship and familiarity with others.  
          </p>

          <p style={{'text-indent': '2rem'}}>
            Similarly, meaningful words arise due to individual creativity within a community who agrees upon their use, which is why language itself is the only <a href="https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274">logically decentralized system</a> we know. When what we say and how we say it invites people in and <a href="https://andytudhope.africa/academy/communal-language/#love-this-sound">calls up a response</a>, meaning is made more widely accessible<sup>7</sup>. When we cast these new networks as economies of sign rather than of ownership, then the game becomes one of <a href="https://youtu.be/uN4g0Sr3jhs?t=1918">actively finding more people able to respond</a>, rather than extracting rent from my exclusive right to some artificially scarce series of bits.
          </p>

          <p style={{'text-indent':'2rem'}}>
            Economies of sign emerge from the shared experience of public consensus rules, clearly priced <a href="https://github.com/crytic/evm-opcodes">opcodes</a>, and executable speech. The value of such economies is held in <a href="https://libraryofbabel.info/bookmark.cgi?findintheway">positively signed</a> individual messages which enact meaning within the context of a collective record that no-one controls. This doesn’t mean we can now name (or code) the dao; it just means we can iteratively sign into existence the kinds of shared state which will allow individuals to experience harmoniously what words like dao signify in their personal contexts.
          </p>

          <p style={{'text-indent':'2rem'}}> 
            How can I take responsibility without the resources to make my signature meaningful, though? I have tried to use <a href="https://medium.com/@cryptowanderer/merry-merkle-magic-1458a25ee2dd">words to speak my imagination</a> into existence, and have seen the limits of such work. My signatures do not move markets. However, markets are not the arbiters of meaning, they are mechanisms for efficient resource allocation. Your signature is not made meaningful by its effects: your signature is meaningful by virtue of its singular existence. New forms of ignorance and <a href="https://youtu.be/3HYlbg6RKMA?t=1145">injustice will always appear</a>, yet knowing this and still having the will and creativity to iterate over incentive structures is what will continually imbue our shared record with <a href="injustice will always appear">true beauty</a>.
          </p>

          <p className="poetry">
            “Everything depends on the individual human being, regardless of how small a number of like-minded people there are […] on each person […] creatively making the meaning of life a reality in his or her own being.”<br/><br/> - <a href="https://www.themarginalian.org/2020/05/17/yes-to-life-in-spite-of-everything-viktor-frankl/">Viktor Frankl</a>
          </p>

          {/* <p style={{'text-indent': '2rem'}}> 
            We believe that to build towards the pluriverse means building in a way that is open, interoperable, and supports the commons. It means building with an ethos of interdependence. It means not building moats, including data moats, that restrict the freedom of “all peoples to choose, individually or collectively, [any] relations”, but paving existing desire paths and tools that others can freely choose to traverse, shape, and use. 
          </p> */}
        
        <h2 className="pt-10 text-3xl font-title w-full px-20 text-center">
          Song of Signs
        </h2>

          <p style={{'text-indent':'2rem'}}>
            The ‘coin’ your key controls comes from the Latin word cuneus, which once meant ‘cornerstone’. In this single sign is the signal we can use to understand the shifting meaning of ownership. Will your coins be the <a href="https://www.interdependence.online/declaration/e-bw-AGkYsZFYqmAe2771A6hi9ZMIkWrkBNtHIF1hF4">cornerstones of pluriverses</a>, or the currency of one more unjust and unequal realm? 
          </p>

          <p style={{'text-indent': '2rem'}}>
            Because it has worked almost exactly as it should, one of the few things people notice about the Ethereum Foundation is the <a href="https://ethereum.foundation/philosophy/">principle of subtraction</a>. Do not make yourself the onlyOwner: it is by subtracting from your own importance that care for, and improvement of, our communal capacity and capability can happen. 
          </p>

          <p style={{'text-indent': '2rem'}}>
            Seek to improve the people around you by humbling yourself and handing over power at every chance, without shirking responsibility. Delighted, you will gradually find yourself doing nothing, being happy.
          </p>

          <p style={{'text-indent':'2rem'}}>
            There is also another connotation waiting for us in the word ‘economy’: to use sparingly. The messages we sign as a means of managing our shared record cannot be censored by anyone, but they can be seen by everyone, so be careful what kinds of money you make meaningful. With programmable power comes permanent accountability.  
          </p>

          <p style={{'text-indent':'2rem'}}>
            ‘The Ownership Economy’ doesn’t describe the kind of world we want to create together. Noticing this is not just a question about what kind of web we want; it’s about how we see ourselves. Do we trust ourselves enough to signal the kinds of economies we wish to engage in, and do we have the <a href="https://youtu.be/LwLP62fL83k?t=572">courage</a> to sign the <a href="https://pineapplefund.org/">sorts of transactions</a> which will bring that about?  
          </p>

          <p style={{'text-indent':'2rem'}}>
            The word ‘token’ comes from a Germanic root meaning ‘to teach’. Kei Kreutler teaches that it also carries a trace of the older word <i><a href="http://www.dictionaryofspiritualterms.com/public/Glossaries/terms.aspx?ID=352">sunthemata</a></i>: divine symbols within all existence meant to assist the soul on its journey from, and back to, grace. When we leave a token of love or appreciation for no reason other than the simple recognition that love and gratitude are already their own reward, then such signed symbols can guide us all home, across time. This is what I understand <a href="https://dyeing.thebluebook.co.za/?stackedPages=%2Fsigned&stackedPages=%2Fnow">courageous signatures</a> to mean: not just the set which shifts markets and remakes the world, but the superset which marks what I already mean, which re-members this singular human response to our shared being.
          </p>

          <p className="poetry">
            To give birth, to nourish,<br/>
            to bear and not to own,<br/>
            to act and not lay claim,<br/>
            to lead and not to rule:<br/>
            this is mysterious power.<br/>
            <br/>
            -- Chapter 10, Tao Te Ching
          </p>
          

          <p className="poetry">
            “It is not we who are permitted to ask about the meaning of life — it is life that asks the questions [...] We are the ones who must give answers to the constant, hourly question of life [...]  Living itself means nothing other than being questioned; our whole act of being is nothing more than responding to — of being responsible toward — life [...] now the present is everything as it holds the eternally new question of life for us.” <br/>
            <br/>
            - Viktor Frankl
          </p>


          <p className="poetry">
            My storehouse burned down -<br/>
            now nothing stands between me<br/>
            and the moon above.<br/>
            <br/>
            - Mizuta Masahide
          </p>

          <p className="poetry">
            To have without possessing,<br/>
            do without claiming,<br/>
            lead without controlling:<br/>
            this is mysterious power.<br/>
            <br/>
            -- Chapter 51, Tao Te Ching
          </p>

          <img src="/signature_derrida.png" alt="Jacques Derrida"/>

          <p className="pt-10">
          Poetry, well placed, <br/>
          can serve up <br/>
          a subversive education <br/>
          in potent signs, <br/>
          drawing out what is <br/>
          already within <br/>
          so we can wake <br/>
          the dream into reality. 
          </p>

          <p className="pt-10">
          Peer into this paradox <br/>
          without possessing it. <br/>
          Play the nebulous pattern <br/>
          of you through all <br/>
          the others who care, <br/>
          key pairs sharing what comes, <br/>
          meaning they make wealth <br/>
          between the curves <br/>
          of this created web <br/>
          we now call home. </p>

          <p className="pt-10">
          There is the courage <br/>
          in each heart <br/>
          to hear truth <br/>
          and bear witness <br/>
          and lay no claim. </p>

          <p className="pt-10">
          Simply sign it on, <br/>
          my soul. 
          </p>
        </div>
        </HighlightPop>
      </div>
    
    </div>
    <footer className="py-10 font-mono text-center text-sm text-gray-600 items-center"> 
       {/* <a 
        href={"/declaration"}
        className="px-2 border-purple-2004 border-b-2 rounded-xl"> 
          (Planted on the Permaweb. ☘️. Feb 09, 2022.)
       </a> */}
      <div className="mt-10 
        px-20
        flex flex-col items-center 
        font-body text-sm text-gray-600 content-center">

        <div className="md:max-w-3xl space-y-3">
              <p className="text-left">
                <sup> 1 </sup>
                The use of “can” rather than “may” in this sentence illustrates how <a href="https://kernel.community/en/learn/module-1/dreamers/#learning-the-language">law is enacted in substantive</a> rather than formal ways on such networks.
              </p>
              <p className="text-left">
               <sup> 2 </sup> 
               The word ‘technology’ comes to us from the Greek <a href="https://ethblock.art/editorial/art-in-formation">tekhne</a>, meaning ‘craft’.
               </p>
              <p className="text-left"> 
                <sup> 3 </sup>  <a href="https://www.youtube.com/watch?v=ndEWof-8xTY&t=91s">Tolkien’s description</a> of the <a href="https://youtu.be/3HYlbg6RKMA?t=892">difference between allegory and applicability</a> captures the problem crypto UX designers face: applicability is about the freedom of the reader; allegory is about the domination of the author. Applicability creates the <a href="https://kernel.community/en/learn/module-3/freedom/">freedom</a> for us to respond to our own constraints, allegory limits our imagination of what it might actually mean to connect the world. 
              </p>
              <p className="text-left">
              <sup> 4</sup> The <a href="https://otherinter.net/research/positive-sum-worlds/">otherinter.net</a> phrases it thus: “crypto protocols reintroduce participatory governance of public systems as a part of daily life.”
            </p>
            <p className="text-left">
              <sup> 5 </sup> As Scott Moore reminded me, responsibility is <a href="https://www.thecrimson.com/article/2017/5/25/desai-commencement-ed/">not about optionality</a>; it is about care.
            </p>
            <p className="text-left"> 
            <sup> 6 </sup>  Daanish Shabbir writes, “The wealth that is earned through control confers control. That control in turn forecloses the possibilities for my flourishing. The wealth that care confers, confers care in return.” As Robin Wall Kimmerer writes, over and over, “All flourishing is mutual.”
            </p>

           <p className="text-left">
            <sup> 7 </sup> 
            The meaning of any word can be described with three interrelated concepts: the signifier, the signified, and the sign. Consider the word ‘dog’. The actual word, d-o-g, written on your screen is the “signifier”. The idealized picture of a four-legged furry creature wagging its tail that is called up in your mind when you read the word is the “signified”. The “sign” is this particular shiba inu in all its singular glory. This works with words for which we all share common experience, like dogs or cats or fancy hats. But what about complex words like dao or buddha or christ? These words certainly signify something, but the violent history of institutionalized religion reveals that it is clearly not shared and that the only way to approach meaningful description in natural language is through negation: “The dao that can be named is not the eternal dao”. What signatures allow for, though, is not only negation, but the possibility of positive response in the sense Viktor Frankl meant in <i>Yes To Life</i>.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
