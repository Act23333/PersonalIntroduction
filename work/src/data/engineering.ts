export interface EngineeringStep {
  step: string;
  icon: string;
  description: string;
  details: string[];
}

export const engineeringFlow: EngineeringStep[] = [
  {
    step: "需求分析",
    icon: "FileSearch",
    description: "理解业务需求，明确系统边界",
    details: [
      "梳理业务流程与核心用例",
      "定义功能需求与非功能需求",
      "识别技术风险与瓶颈",
    ],
  },
  {
    step: "架构设计",
    icon: "Blocks",
    description: "设计系统架构与技术选型",
    details: [
      "微服务拆分与边界定义",
      "数据库ER建模与索引设计",
      "缓存策略与消息队列设计",
    ],
  },
  {
    step: "编码实现",
    icon: "Code",
    description: "高质量代码实现与Review",
    details: [
      "遵循RESTful API设计规范",
      "单元测试覆盖核心逻辑",
      "Git分支管理与Code Review",
    ],
  },
  {
    step: "测试优化",
    icon: "TestTube",
    description: "性能测试与系统优化",
    details: [
      "JMeter压力测试与性能调优",
      "慢SQL分析与索引优化",
      "缓存命中率监控与调整",
    ],
  },
  {
    step: "容器化部署",
    icon: "Container",
    description: "Docker容器化与CI/CD",
    details: [
      "Dockerfile编写与镜像构建",
      "Docker Compose编排多服务",
      "Nginx反向代理与负载均衡",
    ],
  },
  {
    step: "上线运行",
    icon: "Rocket",
    description: "服务上线与运维监控",
    details: [
      "灰度发布与版本回滚策略",
      "日志收集与告警配置",
      "持续监控与故障响应",
    ],
  },
];
