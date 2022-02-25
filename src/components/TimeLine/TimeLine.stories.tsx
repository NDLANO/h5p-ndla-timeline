/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimeLine, TimeLineProps } from "./TimeLine";
import { EventItemType } from "../../types/EventItemType";
import { GridItem } from "../../types/GridItem";
import { Tag } from "../../types/Tag";

export default {
  title: "Organisms/Timeline",
  component: TimeLine,
} as ComponentMeta<typeof TimeLine>;

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
    color: "#93c0a4",
    name: "Eton blue tag",
  },
  tag2: {
    color: "#eabda8",
    name: "Desert sand tag",
  },
  tag3: {
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
    eras: [],
  },
};

export const WomenInComputing: ComponentStory<typeof TimeLine> = () => {
  const args: React.ComponentPropsWithoutRef<typeof TimeLine> = {
    ...defaultArgs,
  };
  return <TimeLine {...args} />;
};
