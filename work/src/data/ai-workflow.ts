export interface AIWorkflowStep {
  phase: string;
  icon: string;
  aiRole: string;
  developerRole: string;
}

export const aiWorkflow: AIWorkflowStep[] = [
  {
    phase: "需求分析",
    icon: "Lightbulb",
    aiRole: "辅助梳理需求文档，生成用户故事",
    developerRole: "定义技术边界，评估可行性",
  },
  {
    phase: "技术方案",
    icon: "PenTool",
    aiRole: "生成架构方案选项，对比优缺点",
    developerRole: "技术选型决策，架构评审",
  },
  {
    phase: "代码生成",
    icon: "Terminal",
    aiRole: "生成框架代码，加速CRUD开发",
    developerRole: "核心逻辑编写，代码质量把控",
  },
  {
    phase: "代码Review",
    icon: "GitPullRequest",
    aiRole: "检测代码异味，建议优化方向",
    developerRole: "最终Review决策，合并评审",
  },
  {
    phase: "文档生成",
    icon: "FileText",
    aiRole: "自动生成API文档与部署手册",
    developerRole: "审核文档准确性，补充关键细节",
  },
];

export const aiPhilosophy = {
  title: "AI 作为工程助手",
  description: "AI作为工程助手加速开发流程，开发者负责技术决策与质量把控。",
};
