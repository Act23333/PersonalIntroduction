export interface ProjectHighlight {
  label: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  highlights: ProjectHighlight[];
  architecture?: string; // ASCII diagram
}

export const projects: Project[] = [
  {
    id: "local-life-service",
    name: "高并发本地生活服务后端",
    description:
      "类似大众点评的高并发本地生活服务平台，核心功能包括商户查询、优惠券秒杀、用户签到、好友关注与Feed流分享。",
    techStack: [
      "SpringBoot",
      "MyBatis-Plus",
      "MySQL",
      "Redis",
      "Redisson",
      "Docker",
      "Nginx",
      "JWT",
    ],
    highlights: [
      {
        label: "缓存设计",
        description:
          "使用Redis构建多级缓存体系，结合Lua脚本实现原子性，有效应对缓存穿透、雪崩、击穿问题",
      },
      {
        label: "超卖控制",
        description:
          "使用Redisson分布式锁+乐观锁，实现一人一单，防止超卖",
      },
      {
        label: "异步秒杀",
        description:
          "使用Redis Stream搭建消息队列，实现下单通知，异步创建订单，降低数据库压力",
      },
      {
        label: "安全认证",
        description:
          "利用自定义拦截器，实现集群环境的登录校验和权限动态刷新",
      },
      {
        label: "项目部署",
        description:
          "Docker容器化部署应用，配合Nginx实现反向代理与负载均衡，提升系统可扩展性",
      },
    ],
    architecture: `
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Nginx      │───▶│  SpringBoot  │───▶│    MySQL     │
│ Load Balancer│    │   App x N    │    │   Database   │
└──────────────┘    └──────┬───────┘    └──────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │  Redis   │ │ Redis    │ │ Redisson │
        │  Cache   │ │ Stream   │ │  Lock    │
        └──────────┘ └──────────┘ └──────────┘
`,
  },
  {
    id: "microservice-ecommerce",
    name: "微服务电商平台",
    description:
      "基于微服务架构的B2B2C电商系统，包含商品、订单、用户、支付、库存等独立服务，支撑高并发电商交易场景。",
    techStack: [
      "SpringCloud",
      "SpringCloudAlibaba",
      "SpringBoot",
      "MyBatis-Plus",
      "MySQL",
      "Redis",
      "Docker",
      "RabbitMQ",
      "SpringAI",
      "OSS",
      "ES",
    ],
    highlights: [
      {
        label: "服务调用与治理",
        description:
          "使用OpenFeign实现服务间声明式调用，Nacos实现服务注册发现与配置热更新，Gateway集成JWT OAuth2统一认证与路由规则分发",
      },
      {
        label: "服务安全",
        description:
          "使用Sentinel对核心接口进行限流与熔断降级，并采用Seata AT模式管理下单扣库存分布式事务",
      },
      {
        label: "查询优化",
        description:
          "使用Elasticsearch配合Kibana构建商品搜索引擎和Redis缓存热点数据提高查询效率",
      },
      {
        label: "异步下单",
        description:
          "使用RabbitMQ实现订单倒计时、异步的支付确认和异步更新索引库",
      },
      {
        label: "防止重复下单",
        description:
          "生成支付订单前，使用数据库进行幂等性校验，防止重复提交",
      },
      {
        label: "AI智能助手",
        description:
          "SpringAI接入DeepSeekV3，智能商品导购，@Tool注解声明工具链，支持多轮对话记忆，支持系统降级",
      },
    ],
    architecture: `
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ Gateway  │   │  Nacos   │   │ Sentinel │   │  Seata   │
│  + JWT   │   │ Registry │   │  Circuit │   │   AT     │
└────┬─────┘   └──────────┘   └──────────┘   └──────────┘
     │
     ├──────▶ Order Service ──────▶ MySQL + Redis
     ├──────▶ Product Service ────▶ ES + OSS
     ├──────▶ Payment Service ────▶ RabbitMQ
     ├──────▶ User Service ───────▶ MySQL
     └──────▶ AI Service ─────────▶ DeepSeek V3
`,
  },
];
