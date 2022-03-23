/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimeLine } from "./TimeLine";
import { EventItemType } from "../../types/EventItemType";
import { GridItem } from "../../types/GridItem";
import { Tag } from "../../types/Tag";

export default {
  title: "Organisms/Timeline",
  component: TimeLine,
} as ComponentMeta<typeof TimeLine>;

type TimeLineProps = React.ComponentPropsWithoutRef<typeof TimeLine>;

const textRightItems: Array<GridItem> = [
  {
    id: "1",
    width: 40,
    height: 20,
    x: 55,
    y: 5,
    type: "title",
  },
  {
    id: "2",
    width: 40,
    height: 25,
    x: 55,
    y: 30,
    type: "textContent",
  },
  {
    id: "3",
    width: 40,
    height: 75,
    x: 5,
    y: 5,
    type: "media",
  },
];

const textLeftItems: Array<GridItem> = [
  {
    id: "1",
    width: 40,
    height: 20,
    x: 5,
    y: 5,
    type: "title",
  },
  {
    id: "2",
    width: 40,
    height: 25,
    x: 5,
    y: 30,
    type: "textContent",
  },
  {
    id: "3",
    width: 40,
    height: 75,
    x: 55,
    y: 5,
    type: "media",
  },
];

const titleSlide: EventItemType<"title"> = {
  id: "slide-1",
  slideType: "title",
  title: "Women in computing",
  description: `<p class="lead">In this sample timeline, we'll walk you through what TimelineJS can do by looking at some of the more important contributions women have made to computer science.</p>`,
  image: {
    path: "https://upload.wikimedia.org/wikipedia/commons/1/17/World%27s_First_Computer%2C_the_Electronic_Numerical_Integrator_and_Calculator_%28ENIAC%29.gif",
  },
  eventContent: {
    items: textRightItems,
  },
  mediaType: "image",
  layout: "right",
};

const tags: Record<string, Tag> = {
  tag1: {
    id: "tag-1",
    color: "#93c0a4",
    name: "Eton blue tag",
  },
  tag2: {
    id: "tag-2",
    color: "#eabda8",
    name: "Desert sand tag",
  },
  tag3: {
    id: "tag-3",
    color: "#5f00ba",
    name: "Purple tag",
  },
};

const defaultArgs: TimeLineProps = {
  timelineTitle: "Women in Computing",
  data: {
    titleSlide,
    showTitleSlide: true,
    timelineItems: [
      {
        id: "slide-2",
        mediaType: "image",
        slideType: "regular",
        title: "Ada Lovelace",
        description: `<p>Women have been programming since before it was a thing. Take <a href="https://en.wikipedia.org/wiki/Ada_Lovelace">Ada Lovelace</a>: Daughter of Lord Byron, she's often credited as the first computer programmer. Her work on <a href="https://en.wikipedia.org/wiki/Analytical_Engine">Charles Babbage's Analytical Engine</a> contains notes of the first machine-implemented algorithm.</p><span class="tl-note">This slide demonstrates a simple "image" media type.</span>`,
        startDate: "1815-12-10",
        endDate: "1852-11-27",
        image: {
          path: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/713px-Ada_Lovelace_portrait.jpg",
          copyright: {
            author: "Wikimedia Common",
          },
        },
        eventContent: {
          items: textLeftItems,
        },
        layout: "left",
        tags: [tags.tag1, tags.tag2, tags.tag3],
      },
      {
        id: "slide-3",
        mediaType: "custom",
        slideType: "regular",
        title: "Edith Clarke: Bucking the Trend",
        description: ``,
        startDate: "1948-3-14",
        customMedia: `<blockquote>There is no demand for women engineers, as such, as there are for women doctors; but there's always a demand for anyone who can do a good piece of work. <cite>Edith Clarke, first female professor of electrical engineering in the United States</cite></blockquote>`,
        eventContent: {
          items: textRightItems,
        },
        layout: "right",
        tags: [tags.tag2],
      },
      {
        id: "slide-4",
        mediaType: "custom",
        slideType: "regular",
        title: "...And the women who made it work",
        description: `<p>The ENIAC programmers included a number of women: Jean Bartik, Marlyn Wescoff Meltzer, Ruth Lichterman Teitelbaum, Kay McNulty Mauchly Antonelli, Frances Spence, and Frances Elizabeth "Betty" Holberton. Despite their groundbreaking work, the Army never released the names of the women who worked on the ENIAC, and they were largely forgotten until Kathy Kleiman discovered their story in 1985.</p> <span class="tl-note">You can add a YouTube URL like this video on the ENIAC Women.
        .</span>`,
        startDate: "1943-7",
        endDate: "1946",
        customMedia: "https://www.youtube.com/watch?v=aPweFhhXFvY",
        eventContent: {
          items: textRightItems,
        },
        layout: "left",
        tags: [tags.tag1],
      },
      {
        id: "slide-5",
        mediaType: "custom",
        slideType: "regular",
        title: "The First Computer",
        description: `Code named "Project PX" and funded by the United States Army, the first general-purpose computer was the Electronic Numerical Integrator And Computer (ENIAC). It was developed at the University of Pennsylvania's Moore School of Electrical Engineering.
        <p><span class="tl-note">Timeline can easily embed Google Maps</span>`,
        startDate: "1943-6-5",
        endDate: "1946",
        customMedia:
          "https://www.google.com/maps/place/University+of+Pennsylvania/@39.9522188,-75.1932137,17z/data=!3m1!4b1!4m2!3m1!1s0x89c6c65a7f3bccc1:0x9eaa6a2b2d6fe94",
        eventContent: {
          items: textRightItems,
        },
        layout: "left",
      },
      {
        id: "slide-6",
        mediaType: "custom",
        slideType: "regular",
        title: "Rózsa Péter writes recursion",
        description: `<p>Hungarian-born Rózsa Péter studied number theory and poetry before becoming interested in the idea that would become recursion theory. She published her paper "Recursive Functions" in 1951, but it wasn't until the mid-50's that she began to apply her work to the realm of computers. </p><span class="tl-note">This excerpt is embedded from Wikipedia. Just include the URL to the Wikipedia article.</span>`,
        startDate: "1951",
        customMedia:
          "https://en.wikipedia.org/wiki/Reduction_(recursion_theory)",
        eventContent: {
          items: textRightItems,
        },
        layout: "left",
      },
      {
        id: "slide-7",
        mediaType: "custom",
        slideType: "regular",
        title: "Grace Hopper invents the compiler",
        description: `<p>In her career with the Navy, Rear Admiral Grace Hopper worked on the first commercial computer (UNIVAC) and laid the groundwork for the programming language COBOL. But her most notable invention was the compiler, which can transform a source language into binary code. (In other words, it can translate the code you and I write into 0s and 1s.) She developed it in 1952, but she said "Nobody would touch it. They told me computers could only do arithmetic."</p><span class="tl-note">Embed sound clips from Soundcloud.</span>`,
        startDate: "1952",
        customMedia:
          "https://soundcloud.com/innovationhub/grace-hopper-the-life-of-a-coding-pioneer",
        eventContent: {
          items: textRightItems,
        },
        layout: "left",
        tags: [tags.tag3, tags.tag2],
      },
      {
        id: "slide-8",
        mediaType: "custom",
        slideType: "regular",
        title: "Contributions to space exploration",
        description: `One of the first African-American women to earn a Ph.D in mathematics, Evelyn Boyd Granville focused on aeronautics and space during her career. In 1956, she worked with NASA and IBM on Project Mercury, the first manned space flight. She worked with NASA again a few years later on the Apollo Project.<span class="tl-note">Videos from Vimeo are also easy to embed.</span>`,
        startDate: "1956",
        endDate: "1962",
        customMedia: "https://vimeo.com/304869290",
        eventContent: {
          items: textRightItems,
        },
        layout: "right",
        tags: [tags.tag3, tags.tag1],
      },
      {
        id: "slide-9",
        mediaType: "custom",
        slideType: "regular",
        title: "The First PhD in Computer Science",
        description: `One of the first women (if not the first woman) to earn a Ph.D in computer science, Sister Mary Kenneth Keller also contributed to the development of the BASIC language during her time at Dartmouth College. She then founded the computer science department at Clarke College and directed it for the next 20 years.`,
        startDate: "1958",
        customMedia:
          "https://www.women.cs.cmu.edu/ada/Resources/Women/pictures/mary_keller.png",
        eventContent: {
          items: textRightItems,
        },
        layout: "left",
        tags: [tags.tag2, tags.tag3],
      },
      {
        id: "slide-10 layout-right",
        mediaType: "custom",
        slideType: "regular",
        title: "Karen Spärck Jones makes search possible",
        description: `A professor at Cambridge Computer Laboratory, Spärck Jones was interested in natural language processing and information retrieval. In 1972, she introduced the concept of inverse document frequency, which most search engines still rely on.`,
        startDate: "1972",
        customMedia: "https://www.youtube.com/watch?v=4-DyVzj-f3c",
        eventContent: {
          items: textRightItems,
        },
        layout: "right",
      },
      {
        id: "slide-11",
        mediaType: "custom",
        slideType: "regular",
        title: '"The Mother of the Internet"',
        description: `Often called "the Mother of the Internet," Radia Perlman's work on spanning tree protocol enabled the development of modern networking. She holds more than 100 patents, which is what mothers do best.`,
        startDate: "1985",
        customMedia: "https://www.youtube.com/watch?v=I7FYG-XVgk4",
        eventContent: {
          items: textRightItems,
        },
        layout: "right",
        tags: [],
      },
    ],
    categories: [],
    eras: [
      {
        name: "World war 1",
        startDate: "1914-07-28",
        endDate: "1918-11-11",
      },
      {
        name: "World war 2",
        startDate: "1939-09-01",
        endDate: "1945-09-02",
      },
    ],
  },
};

export const WomenInComputingHuman: ComponentStory<typeof TimeLine> = () => {
  const args: TimeLineProps = {
    ...defaultArgs,
  };
  return <TimeLine {...args} />;
};

export const WomenInComputingCosmological: ComponentStory<
  typeof TimeLine
> = () => {
  const args: TimeLineProps = {
    ...defaultArgs,
    data: {
      ...defaultArgs.data,
      behaviour: {
        ...defaultArgs.data.behaviour,
        scalingMode: "cosmological",
      },
    },
  };
  return <TimeLine {...args} />;
};

export const WomenInComputingIndexed: ComponentStory<typeof TimeLine> = () => {
  const args: TimeLineProps = {
    ...defaultArgs,
    data: {
      ...defaultArgs.data,
      timelineItems: defaultArgs.data.timelineItems?.map((item, index) => ({
        ...item,
        startDate: index.toString(),
        endDate: undefined,
      })),
      behaviour: {
        ...defaultArgs.data.behaviour,
        scalingMode: "index",
      },
    },
  };
  return <TimeLine {...args} />;
};

export const TalesOfAuLac: ComponentStory<typeof TimeLine> = () => {
  const args: TimeLineProps = {
    timelineTitle: "Tales of Âu Lạc",
    data: {
      showTitleSlide: true,
      titleSlide: {
        id: "slide-1",
        layout: "left",
        mediaType: "custom",
        slideType: "title",
        customMedia:
          "https://raw.githubusercontent.com/baohouse/labs.baohouse.net/master/images/au-lac/au-lac.jpg",
        title: "Tales of Âu Lạc:<br/>Zhong Shi ❤ ︎Mỵ Châu",
        description: "<p>Star-crossed lovers from feuding kingdoms.</p>",
      },
      timelineItems: [
        {
          id: "slide-2",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Gold_Mask_%28%E9%BB%84%E9%87%91%E9%9D%A2%E7%BD%A9%29.jpg/576px-Gold_Mask_%28%E9%BB%84%E9%87%91%E9%9D%A2%E7%BD%A9%29.jpg",
          title: "Last king of Shu&rsquo;s Kaiming dynasty put to death",
          description:
            "<p>By this time, <a target='_blank' href='https://en.wikipedia.org/wiki/Shu_(state)'>Shu</a> is already conquered by <a target='_blank' href='https://en.wikipedia.org/wiki/Qin_(state)'>Qin</a> during the <a target='_blank' href='https://en.wikipedia.org/wiki/Warring_States_period'>Warring States period</a> in ancient China. The Kaiming dynasty's final king, Wan, was put to death. According to the legends of the <a target='_blank' href='https://en.wikipedia.org/wiki/Tay_people'>Tay peoples</a>, <a target='_blank' href='https://vi.wikipedia.org/wiki/Th%E1%BB%A5c_Ch%E1%BA%BF'>Thục Chế</a> (蜀制; Shǔ Zhì), who is rumored to be a member of the Kaiming dynasty, leads the remaining important members of the dynasty southward, and integrate with the <a target='_blank' href='https://en.wikipedia.org/wiki/%C3%82u_Vi%E1%BB%87t'>Âu Việt</a> (甌越; Ōuyuè) peoples.</p>",
          startDate: "-285",
        },
        {
          id: "slide-3",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://raw.githubusercontent.com/baohouse/labs.baohouse.net/master/images/au-lac/thuc-phan.jpg",
          title: "Thục Phán born",
          description:
            "<p>According to the legends of the Tay peoples, Thục Chế (蜀制; Shǔ Zhì) sires <a target='_blank' href='https://en.wikipedia.org/wiki/An_D%C6%B0%C6%A1ng_V%C6%B0%C6%A1ng'>Thục Phán</a> (蜀泮; Shǔ Pàn) while living among the <a target='_blank' href='https://en.wikipedia.org/wiki/%C3%82u_Vi%E1%BB%87t'>Âu Việt</a> (甌越; Ōuyuè) peoples.</p>",
          startDate: "-275",
        },
        {
          id: "slide-4",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/c/ca/Battle_of_Changping.png",
          title:
            "<a target='_blank' href='https://en.wikipedia.org/wiki/Battle_of_Changping'>Battle of Changping</a>",
          description:
            "<p>A military campaign that concluded with a decisive victory by <a target='_blank' href='https://en.wikipedia.org/wiki/Qin_(state)'>Qin</a> over <a target='_blank' href='https://en.wikipedia.org/wiki/Zhao_(state)'>Zhao</a>. Despite the Zhao military surrendering, an estimated 450,000 captured soldiers were executed en masse by live burial. Zhao suffers a devastating loss that it could not not recover from.</p>",
          startDate: "-262",
          endDate: "-260",
        },
        {
          id: "slide-5",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://raw.githubusercontent.com/baohouse/labs.baohouse.net/master/images/au-lac/au-lac-map.jpg",
          title: "Âu Lạc founded",
          description:
            "<p>Thục Phán (18), along with an alliance of Âu Việt tribes, conquer the <a target='_blank' href='https://en.wikipedia.org/wiki/H%E1%BB%93ng_B%C3%A0ng_dynasty'>Hồng Bàng dynasty</a> of the <a target='_blank' href='https://en.wikipedia.org/wiki/L%E1%BA%A1c_Vi%E1%BB%87t'>Lạc Việt</a> (雒越; Luòyuè) peoples and establishes the kingdom of <a target='_blank' href='https://en.wikipedia.org/wiki/%C3%82u_L%E1%BA%A1c'>Âu Lạc</a>.</p>",
          startDate: "-257",
        },
        {
          id: "slide-6",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/1/16/Co_loa_Citadel.jpg",
          title: "Building of Cổ Loa Citadel",
          description:
            "<p><a target='_blank' href='https://en.wikipedia.org/wiki/C%E1%BB%95_Loa_Citadel'>Cổ Loa Citadel</a> serves as the administrative center for Âu Lạc. The official date of completion is not known, but a hypothesis of 25 years after Âu Lạc was established seems reasonable. An estimated 2 million cubic meters of material were moved for the structure, roughly the volume of the <a target='_blank' href='https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza'>Great Pyramid of Giza</a> (which itself took 20 years and 100,000 slaves to complete).</p>",
          startDate: "-257",
          endDate: "-232",
        },
        {
          id: "slide-7",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://raw.githubusercontent.com/baohouse/labs.baohouse.net/master/images/au-lac/zhao-tuo.jpg",
          title: "Zhao Tuo born",
          description:
            "<p>Zhao Tuo is born in Zhao, in what is present-day <a target='_blank' href='https://en.wikipedia.org/wiki/Zhengding_County'>Zhengding County</a>, Hebei Province, China.</p>",
          startDate: "-240",
        },
        {
          id: "slide-8",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/EN-HAN260BCE.jpg/834px-EN-HAN260BCE.jpg",
          title: "Han falls to Qin",
          description: "&nbsp;",
          startDate: "-230",
        },
        {
          id: "slide-9",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/EN-ZHAO260BCE.jpg/834px-EN-ZHAO260BCE.jpg",
          title: "Zhao falls to Qin",
          description:
            "Zhao Tuo (12) would bear witness to the fall of his country to Qin. Within a few years, he will enlist (or will be drafted) and serve in the Qin military.",
          startDate: "-228",
        },
        {
          id: "slide-10",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/EN-WEI260BCE.jpg/834px-EN-WEI260BCE.jpg",
          title: "Wei falls to Qin",
          description: "&nbsp;",
          startDate: "-225",
        },
        {
          id: "slide-11",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/EN-CHU260BCE.jpg/834px-EN-CHU260BCE.jpg",
          title: "Chu falls to Qin",
          description: "&nbsp;",
          startDate: "-223",
        },
        {
          id: "slide-12",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/EN-YAN260BCE.jpg/834px-EN-YAN260BCE.jpg",
          title: "Yan falls to Qin",
          description: "&nbsp;",
          startDate: "-222",
        },
        {
          id: "slide-13",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Qinshihuang.jpg/599px-Qinshihuang.jpg",
          title: "Qin establishes a unified China",
          description:
            "<p>Qi surrenders to the Qin war machine. <a target='_blank' href='https://en.wikipedia.org/wiki/Qin_Shi_Huang'>Qin Shi Huang</a>, establishing the Qin dynasty, becomes the first emperor of a unified China. The Qin leadership direct efforts to dismantle the walls that divided the former countries. Like Qin, however, the <a target='_blank' href='https://en.wikipedia.org/wiki/Xiongnu'>Xiongnu</a> nomadic peoples of the north are also consolidating in power, and so efforts are made to reinforce the northern border through walls and 100,000 troops.</p>",
          startDate: "-221",
        },
        {
          id: "slide-14",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://raw.githubusercontent.com/baohouse/labs.baohouse.net/master/images/au-lac/baiyue.jpg",
          title: "China&rsquo;s southern military campaign",
          description:
            "<p>With the Yue/Việt lands south of the nascent Qin dynasty being lucrative with resources and fertile land, as well as to prevent possible conflicts should the Yue/Việt tribes unite, Qin Shi Huang directs General Tu Sui to lead 500,000 troops divided into five corps in multiple waves southward to conquer the tribes.</p>",
          startDate: "-221",
          endDate: "-214",
        },
        {
          id: "slide-15",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Lingqu_Canal.jpg/1024px-Lingqu_Canal.jpg",
          title: "China completes Lingqu Canal",
          description:
            "<p>To support the &ldquo;pacification of the south&rdquo;, the Chinese complete the 36-km <a target='_blank' href='https://en.wikipedia.org/wiki/Lingqu'>Ling Canal</a>, connecting the Xiang and Li rivers, facilitating material and troop logistics from Qin dynasty China to the southern frontier.</p>",
          startDate: "-214",
        },
        {
          id: "slide-16",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Guangzhou_Panyu_Yuyin_Shanfang_2012.11.19_15-39-52.jpg/1024px-Guangzhou_Panyu_Yuyin_Shanfang_2012.11.19_15-39-52.jpg",
          title: "Chinese military establish Panyu",
          description:
            "<p>After defeating the Nanyue/Nam Việt tribes, the Chinese military establish an administrative center at <a target='_blank' href='https://en.wikipedia.org/wiki/Panyu_District'>Panyu</a>, in present-day <a target='_blank' href='https://en.wikipedia.org/wiki/Guangzhou'>Guangzhou</a>, presiding over the Nanhai Commandery. While launching a successive offensive against the Xi&rsquo;ou/Âu Tây tribes to the west, General Tu Sui is killed. The Qin court appoint Ren Xiao and Zhao Tuo (26) to lead another offensive. They successfully defeat the Xi&rsquo;ou/Âu Tây, and Ren Xiao becomes Viceroy of Nanhai. The Guilin and Xiang Commanderies are also established to reinforce Chinese presence in the Xi&rsquo;ou/Âu Tây lands.</p>",
          startDate: "-214",
        },
        {
          id: "slide-17",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Terracotta_Army%2C_View_of_Pit_1.jpg/1024px-Terracotta_Army%2C_View_of_Pit_1.jpg",
          title: "Qin Shi Huang dies; Zhao Tuo becomes Nanhai Viceroy",
          description:
            "<p>The first Chinese emperor dies while on tour in eastern China, and is succeeded by Ying Huhai who becomes <a target='_blank' href='https://en.wikipedia.org/wiki/Qin_Er_Shi'>Qin Er Shi</a>, the second Chinese emperor. Soon thereafter, Ren Xiao succumbs to a fatal illness. In his deathbed, he names Zhao Tuo (30) the new Viceroy of Nanhai.</p>",
          startDate: "-210-09-10",
        },
        {
          id: "slide-18",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Terracotta_Army%2C_View_of_Pit_1.jpg/1024px-Terracotta_Army%2C_View_of_Pit_1.jpg",
          title: "Collapse of the Qin dynasty",
          description:
            "<p>The Qin leadership quickly lose control of all the conquered territories, as locals begin to assert more sovereignty. Qin Er Shi, being inept, is forced to commit suicide by the chief eunuch Zhao Gao. Ziying, nephew of Qin Er Shi, has Zhao Gao executed. Chu rebels led by <a target='_blank' href='https://en.wikipedia.org/wiki/Emperor_Gaozu_of_Han'>Liu Bang</a> defeat Ziying at a battle in Wei, and Chu leader Xiang Yu executes Ziying. Liu Bang then betrays and defeats Xiang Yu.</p>",
          startDate: "-206",
        },
        {
          id: "slide-19",
          layout: "left",
          mediaType: "custom",
          slideType: "regular",
          customMedia:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Terracotta_Army%2C_View_of_Pit_1.jpg/1024px-Terracotta_Army%2C_View_of_Pit_1.jpg",
          title: "Zhao Tuo declares the Kingdom of Nanyue",
          description:
            "<p>With the demise of the Qin dynasty, Zhao Tuo (36), still overseeing the Nanhai, Guilin, and Xiang commanderies, declares an independent kingdom of Nanyue / Nam Việt.</p>",
          startDate: "-204",
        },
      ],
    },
  };

  return <TimeLine {...args} />;
};
