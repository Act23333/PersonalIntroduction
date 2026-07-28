export interface Skill {
  name: string;
  level: number; // 1-5
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "后端开发",
    icon: "Server",
    skills: [
      { name: "Java", level: 4 },
      { name: "SpringBoot", level: 4 },
      { name: "MyBatis-Plus", level: 4 },
      { name: "JVM", level: 2 },
    ],
  },
  {
    category: "微服务",
    icon: "Network",
    skills: [
      { name: "SpringCloud", level: 3 },
      { name: "Nacos", level: 3 },
      { name: "Gateway", level: 3 },
      { name: "Sentinel", level: 3 },
      { name: "Seata", level: 2 },
      { name: "OpenFeign", level: 3 },
    ],
  },
  {
    category: "数据与基础设施",
    icon: "Database",
    skills: [
      { name: "MySQL", level: 4 },
      { name: "Redis", level: 4 },
      { name: "Elasticsearch", level: 3 },
      { name: "RabbitMQ", level: 3 },
      { name: "Docker", level: 3 },
      { name: "Linux", level: 3 },
      { name: "Nginx", level: 3 },
    ],
  },
  {
    category: "前端开发",
    icon: "Layout",
    skills: [
      { name: "HTML/CSS/JS", level: 3 },
      { name: "Vue", level: 2 },
      { name: "React", level: 2 },
    ],
  },
  {
    category: "AI 开发",
    icon: "Sparkles",
    skills: [
      { name: "SpringAI", level: 3 },
      { name: "DeepSeek", level: 3 },
    ],
  },
];
