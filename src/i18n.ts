import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    zh: {
      nav: { home: '首页', projects: '项目', blog: '博客', about: '关于我' },
      common: { searchPlaceholder: '搜索标题、摘要或标签', readMore: '查看详情' },
      home: {
        heroTitle: "Hi, 👋 I'm Jiahao",
        heroSubtitle: 'Leave this place, go out into the world, and never look back.',
        heroSubtitleZh: '离开这里，走出去，别回头看。',
        profileRole: '澳大利亚蒙纳士大学信息技术硕士（MIT）',
        profileDesc: '工作 6 年后，我决定出国，从打工人转为学生，希望看看外面的世界。',
        recentPosts: '帖子',
        recentProjects: '项目',
        viewAll: '更多',
        posts: [
          { slug: 'hbase', title: 'HBase 连接', date: '2023-03-31', summary: '以 alihbase-client 2.8.6 jar 为例，介绍 HBase 连接的基本步骤。', tags: ['HBase'] },
          { slug: 'kafka', title: '深入理解 Kafka', date: '2022-03-06', summary: '记录 Kafka 关键概念，包括副本、分区、ISR、高水位等机制。', tags: ['Kafka'] },
          { slug: 'flink', title: 'Flink 总结', date: '2020-10-20', summary: 'Flink 是一个开源的分布式计算框架，本文总结了 Flink 的一些基本概念和使用方法。', tags: ['Flink'] },
        ],
      },
      projects: { title: '项目', filterPlaceholder: '筛选技术或标签' },
      blog: { title: '博客', empty: '暂无文章' },
      about: {
        title: '关于我',
        skillsTitle: '技能与技术栈',
        introTitle: '个人概览',
        introBullets: [
          '专注于 <strong>大数据开发</strong> 与数据平台建设',
          '拥有 <strong>6 年</strong> 工作经验',
          '在 <strong>前端、后端、数仓、大数据</strong> 等方向实践，覆盖 <strong>3</strong> 类不同类型公司',
          '当前聚焦 <strong>全栈</strong> 开发',
          '就读 <strong>蒙纳士大学 MIT</strong>（澳大利亚）',
        ],
        // 可视化：指标条与技能进度条
        metrics: [
          { label: '工作年限', value: '6 年' },
          { label: '公司类型', value: '3' },
          { label: '领域', value: '前端 / 后端 / 数仓 / 大数据' },
          { label: '方向', value: '全栈' },
        ],
        skillTitle: '技能熟练度',
        skillBars: [
          { label: 'Java', value: 80, tag: '强项' },
          { label: 'Vue', value: 65 },
          { label: 'MySQL', value: 75, tag: '强项' },
          { label: 'Hadoop', value: 70 },
          { label: 'Cloud', value: 70, tag: '在学' },
        ],
        timeline: [
          {
            date: '03/2025 -- Now',
            title: '攻读信息技术硕士（MIT）',
            company: '莫纳士大学',
            desc: ''
          },
          {
            date: '05/2023 -- 10/2023',
            title: '基于华为云，研发数据治理相关产品，帮助企业快速规范数据管理并提升数据价值。',
            company: '北京外企德科（上海）有限公司',
            desc: ''
          },
          {
            date: '02/2021 -- 01/2023',
            title: '从 0 到 1 构建企业级用户画像平台，在业务高峰支撑 70,000+ QPS、日查询量 3.5 亿+。',
            company: '北京索尔信息科技有限公司',
            desc: ''
          },
          {
            date: '07/2018 -- 02/2021',
            title: '从前端到后端，从数据仓库建模到一数服务开发，全面掌握企业应用开发技能。',
            company: '心知我来网络科技有限公司',
            desc: ''
          }
        ],
      },
    },
    en: {
      nav: { home: 'Home', projects: 'Projects', blog: 'Blog', about: 'About' },
      common: { searchPlaceholder: 'Search title, summary or tags', readMore: 'Read more' },
      home: {
        heroTitle: "Hi, 👋 I'm Jiahao",
        heroSubtitle: 'Leave this place, go out into the world, and never look back.',
        heroSubtitleZh: '离开这里，走出去，别回头看。',
        profileRole: 'MIT at Monash University, Australia',
        profileDesc: 'After working for 6 years, I decided to go abroad, changing my identity from a worker to a student, hoping to see the outside world.',
        recentPosts: 'Posts',
        recentProjects: 'Projects',
        viewAll: 'More',
        posts: [
          { slug: 'hbase', title: 'HBase Connection', date: '2023-03-31', summary: 'Using alihbase-client 2.8.6 jar as an example to introduce basic steps to connect HBase.', tags: ['HBase'] },
          { slug: 'kafka', title: 'Deep Dive into Kafka', date: '2022-03-06', summary: 'Record key Kafka concepts, including mechanisms such as replicas, partitions, ISR, and high watermarks.', tags: ['Kafka'] },
          { slug: 'flink', title: 'Flink Summary', date: '2020-10-20', summary: 'Flink is an open-source distributed computing framework. This post summarizes some basic concepts and usage.', tags: ['Flink'] },
        ],
      },
      projects: { title: 'Projects', filterPlaceholder: 'Filter by tech or tags' },
      blog: { title: 'Blog', empty: 'No posts yet' },
      about: {
        title: 'About',
        skillsTitle: 'Skills & Technologies',
        introTitle: 'Profile Snapshot',
        introBullets: [
          'A <strong>big data development</strong> and data platform focus',
          'With <strong>6 years</strong> of work experience',
          'Worked on <strong>front‑end, back‑end, data warehouse, big data</strong> across <strong>3</strong> company types',
          'Currently focusing on <strong>full‑stack</strong> development',
          'Studying <strong>MIT</strong> at Monash University, Australia',
        ],
        // Visualization: metrics and skill progress bars
        metrics: [
          { label: 'Years', value: '6' },
          { label: 'Company Types', value: '3' },
          { label: 'Domains', value: 'FE / BE / DW / Big Data' },
          { label: 'Focus', value: 'Full Stack' },
        ],
        skillTitle: 'Skill Proficiency',
        skillBars: [
          { label: 'Java', value: 80, tag: 'Strong' },
          { label: 'Vue', value: 65 },
          { label: 'MySQL', value: 75, tag: 'Strong' },
          { label: 'Hadoop', value: 70 },
          { label: 'Cloud', value: 70, tag: 'Learning' },
        ],
        timeline: [
          {
            date: '03/2025 -- Now',
            title: "Pursue a master's degree in IT",
            company: 'Monash University',
            desc: ''
          },
          {
            date: '05/2023 -- 10/2023',
            title:
              'Based on Huawei Cloud, we develop products that focus on data governance to help enterprises quickly standardize data management and improve the value of data.',
            company: 'Beijing FESCO Adecco Shanghai Co., Ltd.',
            desc: ''
          },
          {
            date: '02/2021 -- 01/2023',
            title:
              'Responsible for building an enterprise-level user portrait platform from 0 to 1, supporting 70,000+ qps during business peak and 3.5 billion+ queries per day.',
            company: 'Beijing Souer Information Technology Co., Ltd.',
            desc: ''
          },
          {
            date: '07/2018 -- 02/2021',
            title:
              'From the front-end to the back-end, from data warehouse modeling to one-data service development, master the enterprise application development skills in all aspects.',
            company: 'Xinzhi Wolai Network Technology Co., Ltd.',
            desc: ''
          }
        ],
      },
    },
  },
})