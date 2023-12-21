// src/data/carouselData.ts
import raposa from '../assets/kurama.jpg'
import folha from '../assets/folha.jpg'
import casa from '../assets/casa.jpg'
import cafeteria from '../assets/cafeteria.jpg'
export const carouselData = [
    {
      title: 'Loren ipsum sit amet consectetur, Slide 1',
      description: '1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: raposa,
      link: 'https://www.google.com/search?q=RAPOSAS&oq=raposas&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg70gEIMzM0N2owajmoAgCwAgA&sourceid=chrome&ie=UTF-8',
      order: 0,
    },
    {
      title: 'Loren ipsum sit amet consectetur, Slide 2',
      description: '2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: folha,
      link: 'https://www.google.com/search?sca_esv=592556902&sxsrf=AM9HkKmsvN8FznX2ZFCFwC6oDpC5wlXohQ:1703092771029&q=folha+do+canada&spell=1&sa=X&ved=2ahUKEwjYwIv9wp6DAxXAqJUCHXq8BfIQBSgAegQICBAC&biw=1536&bih=703&dpr=1.25',
      order: 1,
    },
    {
      title: 'Loren ipsum sit amet consectetur, Slide 3',
      description: '3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: casa,
      link: 'https://www.google.com/search?q=casas+de+inverno&sca_esv=592556902&sxsrf=AM9HkKmUmZ-zVymGvw_E2DH3nnULMmtS0A%3A1703092830975&ei=XiKDZZCKO6vI1sQP3vux6Ak&ved=0ahUKEwiQsdaZw56DAxUrpJUCHd59DJ0Q4dUDCBA&uact=5&oq=casas+de+inverno&gs_lp=Egxnd3Mtd2l6LXNlcnAiEGNhc2FzIGRlIGludmVybm8yBRAAGIAEMggQABgWGB4YDzIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMggQABgWGB4YD0jdFlAAWL8VcAB4AZABAJgB2gGgAb8RqgEGMC4xNS4xuAEDyAEA-AEBwgIEECMYJ8ICChAjGIAEGIoFGCfCAhMQLhiABBiKBRhDGLEDGMcBGNEDwgIKEAAYgAQYigUYQ8ICCxAAGIAEGIoFGJIDwgINEAAYgAQYigUYQxixA8ICEBAAGIAEGIoFGEMYsQMYyQPCAiIQLhiABBiKBRhDGLEDGMcBGNEDGJcFGNwEGN4EGOAE2AEBwgIWEC4YgAQYigUYQxixAxjJAxjHARjRA8ICJRAuGIAEGIoFGEMYsQMYyQMYxwEY0QMYlwUY3AQY3gQY4ATYAQHCAgsQABiABBixAxiDAcICDhAAGIAEGIoFGLEDGIMBwgIREC4YgAQYsQMYgwEYxwEY0QPCAhQQLhiABBixAxiDARjHARivARiOBcICCBAAGIAEGLEDwgIIEAAYgAQYyQPCAggQABiABBjLAeIDBBgAIEGIBgG6BgYIARABGBQ&sclient=gws-wiz-serp',
      order: 2,
    },
    {
      title: 'Loren ipsum sit amet consectetur, Slide 4',
      description: '4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: cafeteria,
      link: 'https://www.google.com/search?q=inverno+cafe&sca_esv=592556902&bih=703&biw=1536&hl=pt-BR&sxsrf=AM9HkKloLpPMkDl20Bdjd6ZAGPdqWZKk4Q%3A1703092878194&ei=jiKDZd-vC5Tf1sQPg-WsuAo&ved=0ahUKEwjfrpiww56DAxWUr5UCHYMyC6cQ4dUDCBA&uact=5&oq=inverno+cafe&gs_lp=Egxnd3Mtd2l6LXNlcnAiDGludmVybm8gY2FmZTIOEC4YgAQYywEYxwEYrwEyBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMggQABgWGB4YCjIIEAAYFhgeGA8yCBAAGBYYHhgPMgYQABgWGB4yHRAuGIAEGMsBGMcBGK8BGJcFGNwEGN4EGOAE2AECSNMkUM0OWOgjcAJ4AJABBJgBpwKgAdsSqgEGMC4xNS4xuAEDyAEA-AEBqAIUwgIEECMYJ8ICBRAAGIAEwgIIEAAYgAQYyQPCAgsQABiABBiKBRiSA8ICCxAAGIAEGMsBGJIDwgIHECMY6gIYJ8ICFhAAGAMYjwEY5QIY6gIYtAIYjAPYAQHCAgoQIxiABBiKBRgnwgILEAAYgAQYsQMYgwHCAhEQLhiABBixAxiDARjHARjRA8ICCxAuGLEDGIAEGIoFwgIKEAAYgAQYigUYQ8ICCBAuGLEDGIAEwgIPECMYgAQYigUYJxhGGIECwgIIEAAYgAQYsQPCAg0QABiABBiKBRhDGLEDwgIGEAAYAxgK4gMEGAEgQYgGAboGBggBEAEYC7oGBggCEAEYFA&sclient=gws-wiz-serp',
      order: 3,
    },
  ];
  