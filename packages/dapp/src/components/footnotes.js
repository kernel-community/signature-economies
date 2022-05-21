import React from 'react';
import signature_ethblock from '../images/signature_ethblock.png';
import signature_derrida from '../images/signature_derrida.png';

const FootNotes = () => {
    return (
        <div>
            <div className="py-10 font-mono text-center text-sm text-gray-600 items-center">
                <div className="mt-10 px-8 md:px-20 flex flex-col items-center font-body text-xs md:text-sm text-gray-600 content-center">
                <div className="md:max-w-3xl text-justify space-y-3">
                    <p>
                    <sup> 1 </sup>
                    The use of “can” rather than “may” in this sentence illustrates
                    how{' '}
                    <a target="_blank" rel="noreferrer" href="https://kernel.community/en/learn/module-1/dreamers/#learning-the-language">
                        law is enacted in substantive
                    </a>{' '}
                    rather than formal ways on such networks.
                    </p>
                    <p>
                    <sup> 2 </sup>
                    This quote comes from the last paragraph on{' '}
                    <a target="_blank" rel="noreferrer" href="https://www.studio1.wtf/">
                        this web page
                    </a>
                    , which represents an open source brand we take some inpiration from.
                    </p>
                    <p>
                    <sup> 3 </sup>
                    The word ‘technology’ comes to us from the Greek{' '}
                    <a target="_blank" rel="noreferrer" href="https://ethblock.art/editorial/art-in-formation">
                        tekhne
                    </a>
                    , meaning ‘craft’.
                    </p>
                    <p>
                    <sup> 4 </sup>{' '}
                    <a target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=ndEWof-8xTY&t=91s">
                        Tolkien’s description
                    </a>{' '}
                    of the{' '}
                    <a target="_blank" rel="noreferrer" href="https://youtu.be/3HYlbg6RKMA?t=892">
                        difference between allegory and applicability
                    </a>{' '}
                    captures the problem crypto UX designers face: applicability is
                    about the freedom of the reader; allegory is about the domination
                    of the author. Applicability creates the{' '}
                    <a target="_blank" rel="noreferrer" href="https://kernel.community/en/learn/module-3/freedom/">
                        freedom
                    </a>{' '}
                    for us to respond to our own constraints, allegory limits our
                    imagination of what it might actually mean to connect the world.
                    </p>
                    <p>
                    <sup>5</sup> The{' '}
                    <a target="_blank" rel="noreferrer" href="https://otherinter.net/research/positive-sum-worlds/">
                        otherinter.net
                    </a>{' '}
                    phrases it thus: “crypto protocols reintroduce participatory
                    governance of public systems as a part of daily life.”
                    </p>
                    <p>
                    <sup> 6 </sup> As Scott Moore reminded me, responsibility is{' '}
                    <a target="_blank" rel="noreferrer" href="https://www.thecrimson.com/article/2017/5/25/desai-commencement-ed/">
                        not about optionality
                    </a>
                    ; it is about care.
                    </p>
                    <p>
                    <sup> 7 </sup> Daanish Shabbir writes, “The wealth that is earned
                    through control confers control. That control in turn forecloses
                    the possibilities for my flourishing. The wealth that care
                    confers, confers care in return.” As Robin Wall Kimmerer writes,
                    over and over, “All flourishing is mutual.”
                    </p>

                    <p>
                    <sup> 8 </sup>
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
                    only negation, but{' '}
                    <a target="_blank" rel="noreferrer" href="https://andytudhope.africa/academy/communal-language/#beloved-and-positive-capability">
                        positive capability
                    </a>
                    , a sensibility and capacity well represented by Viktor Frankl in a lesser-known work of his,{' '}
                    <a target="_blank" rel="noreferrer" href="https://www.themarginalian.org/2020/07/17/viktor-frankl-yes-to-life-love-music/">
                        <i>Yes To Life</i> 
                    </a>.
                    </p>

                    <p>
                    <iframe 
                        src="https://www.youtube-nocookie.com/embed/yfQVevK0eI0?start=5" 
                        title="Signature Economies Junto" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                    </p>
                </div>
                </div>
            </div>

            <div className="pt-12 pb-16">
            <hr className="w-2/3 mx-auto" />
            </div>

            <div className="flex flex-col py-16 items-center justify-center">
            <div className="relative group z-40 ">
                <img
                src={signature_ethblock}
                alt="logo"
                />
            </div>
            <div>
                The{' '}
                <a 
                target="_blank" rel="noreferrer"
                className="underline font-bold"
                href="https://ethblock.art/create/1/910815"
                >
                signature style
                </a>{' '}
                for Ethereum block 910815
            </div>
            </div>

            <div className="flex flex-col py-16 items-center justify-center">
            <div className="relative group z-40 ">
                <img
                src={signature_derrida}
                alt="Signature_Derrida"
                />
            </div>
            </div>
        </div>
        


        
    )
}

export default FootNotes;