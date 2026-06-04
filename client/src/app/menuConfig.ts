import type { AppMenuItem, SectionId } from '../shared/types/navigation';

export const appMenuItems: AppMenuItem[] = [
  {
    id: 'bid-generation',
    label: '标书生成',
    description: '技术方案与商务标编制',
    children: [
      {
        id: 'technical-plan',
        label: '生成技术方案',
        description: '根据招标文件重头编写一份标书',
        icon: 'document',
      },
    ],
  },
  {
    id: 'knowledge-base',
    label: '知识库',
    description: '素材、模板和案例资产',
  },
  {
    id: 'bid-check',
    label: '标书检查',
    description: '查重、废标项与合规检查',
    children: [
      {
        id: 'duplicate-check',
        label: '标书查重',
        description: '相似度与重复表达检测',
        icon: 'compare',
      },
      {
        id: 'rejection-check',
        label: '废标项检查',
        description: '硬性条款与响应完整性',
        icon: 'shield',
      },
    ],
  },
];

const developerMenuItems: AppMenuItem[] = [
  {
    id: 'developer-test',
    label: '测试页',
    description: '开发者验证与问题复现',
    children: [
      {
        id: 'developer-json-test',
        label: 'Json请求测试',
        description: '复用项目真实目录生成链路，验证模型 JSON 响应和修复流程。',
        icon: 'code',
      },
      {
        id: 'developer-prompt-lab',
        label: 'Prompt调试台',
        description: '集中观察 Prompt 版本、变量注入和输出约束，便于后续调参。',
        icon: 'prompt',
      },
      {
        id: 'developer-parser-sandbox',
        label: '文件解析沙盘',
        description: '模拟本地解析、MinerU 解析和图片资产入库的调试入口。',
        icon: 'file',
      },
      {
        id: 'developer-export-preview',
        label: '导出链路预演',
        description: '预览 Word、Markdown、Mermaid 图片转换的导出检查路径。',
        icon: 'export',
      },
    ],
  },
];

export function getAppMenuItems(developerMode: boolean): AppMenuItem[] {
  return developerMode ? [...appMenuItems, ...developerMenuItems] : appMenuItems;
}

export function getSectionOrder(developerMode: boolean): SectionId[] {
  return getAppMenuItems(developerMode).flatMap((item) => [item.id, ...(item.children?.map((child) => child.id) ?? [])]);
}

export function getAppMenuItemById(id: SectionId, developerMode: boolean): AppMenuItem | undefined {
  return getAppMenuItems(developerMode).find((item) => item.id === id);
}

export function getParentMenuItemBySection(section: SectionId, developerMode: boolean): AppMenuItem | undefined {
  return getAppMenuItems(developerMode).find((item) => item.id === section || item.children?.some((child) => child.id === section));
}
