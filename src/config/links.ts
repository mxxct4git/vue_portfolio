export const LINKS = {
  github: 'https://github.com/mxxct4git',
  linkedin: 'https://www.linkedin.com/in/jiahao-zhang-311319353/',
  blog: 'https://mxxct4git.github.io/',
} as const

export type LinkKey = keyof typeof LINKS

export const POST_LINKS: Record<string, string> = {
  hbase: 'https://mxxct4git.github.io/2023/03/31/Hadoop/HBase/HBase-4%20%E8%BF%9E%E6%8E%A5/',
  kafka: 'https://mxxct4git.github.io/2022/03/06/Kafka/Kafka-3%20%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3Kafka/',
  flink: 'https://mxxct4git.github.io/2020/10/20/Flink/Flink-2%20%E6%80%BB%E7%BB%93/',
}