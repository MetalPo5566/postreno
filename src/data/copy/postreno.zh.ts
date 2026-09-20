import type { PostRenoCopy } from './types'
import { SITE, ABSOLUTE_PAGES, PAGES } from '../site'

/**
 * The Chinese page. Same shape as postreno.en.ts, same components, same
 * numbers out of prices.json, same four sources. Written for the buyer who
 * already searches 除甲醛 as a category rather than as an add-on.
 *
 * No Chinese webfont is loaded: see the :lang(zh-Hans) stack in global.css.
 */
export const ZH: PostRenoCopy = {
  htmlLang: 'zh-Hans',
  ogLocale: 'zh_MY',
  path: PAGES.postRenoZh,
  langSwitch: { label: 'English', href: PAGES.postRenoEn, hrefLang: 'en-MY' },

  meta: {
    title: '装修后清洁 除甲醛 | 吉隆坡 雪兰莪 | Kleaner',
    description:
      '吉隆坡与雪兰莪的装修后清洁与除甲醛服务，每平方尺 RM1.20 起，处理前后各测一次空气读数。告诉我们交楼日期，我们把档期安排在它后面。',
    ogImage: '/og/index.jpg',
  },

  hero: {
    eyebrow: '装修后清洁 与 除甲醛',
    h1: '装修完工了，甲醛还没有。',
    h1Alternates: [
      '看得见的装修灰尘，看不见的甲醛。两样我们都清。',
      '搬进一个连读数都干净的家。',
    ],
    sub: '装修后清洁加除甲醛处理，处理前后各测一次空气读数，服务范围涵盖吉隆坡与雪兰莪。',
    anchorFrom: '低至',
    anchorRate: '每平方尺建筑面积',
    anchorExample: '1,000 平方尺公寓，低至',
    ctaPrimary: '计算我的报价',
    ctaWhatsApp: '发送我的交楼日期',
    waHandover: '你好 Kleaner，我的装修交楼日期是 ___，想预订装修后清洁与除甲醛处理。',
    trust: ['累积超过 100,000 清洁工时', '服务人员均经背景审查', '不满意，我们重做或退款'],
    imageAlt: '晨光下刚装修完的马来西亚公寓客厅，房内空置，新做的嵌入式柜子，一名 Kleaner 清洁人员手持空气质量检测仪。',
  },

  twoJobs: {
    eyebrow: '两件事，不是一件',
    title: '装修留下的其实是两样东西',
    lead: '一样会落在地上，所以人人都清。另一样根本不会落下来。',
    visible: {
      title: '看得见的那一样',
      lead: '细粉尘会钻进每一个表面，以及师傅打开过的每一道缝。',
      items: [
        '水泥与石膏粉尘遍布整个单位',
        '新瓷砖与云石上的水泥膜',
        '油漆点、玻璃胶痕与胶水残留',
        '钻孔粉尘沉在新柜子与衣橱内部',
        '冷气翅片与出风口里积住的灰',
      ],
    },
    invisible: {
      title: '看不见的那一样',
      lead: '甲醛是气体。它没有灰可扫，白布也擦不出来。',
      items: [
        '来自嵌入式家具所用的夹板、中密度纤维板（MDF）与刨花板',
        '来自黏合它们的胶水，部分油漆与涂料也以甲醛作防腐剂',
        '在这几种人造板中，MDF 的释放量一般最高，而抽屉面板与柜面多半就是用它做的',
        '在室内常见的浓度下，它会刺激眼睛、鼻子与喉咙',
        '交楼之后它仍会持续释放，速度只会缓慢地逐年下降',
      ],
    },
    close: '大多数装修后清洁，只做到第一栏为止。',
  },

  window: {
    eyebrow: '时机',
    title: '交楼与入住之间的那段空档',
    lead: '这件事只有一个正确的时间点，而它比多数人以为的要窄。先预订，我们把档期安排在您的交楼日之后。',
    steps: [
      { title: '师傅交楼', text: '钥匙回到您手上，工程做完了，灰还在。' },
      { title: '验收缺陷', text: '您走一遍单位，把要修的列出来，其他事情都排在后面。' },
      {
        title: 'Kleaner 装修后清洁与除甲醛处理',
        text: '在嵌入式家具装好之后、家具与窗帘进场之前预订。单位是空的，每一个会释放甲醛的表面都碰得到。',
        ours: true,
      },
      { title: '家具进场', text: '送货踩在干净的地板上，而不是把水泥灰磨进去。' },
      { title: '入住', text: '家人在这个单位睡的第一晚，才是真正要紧的那一晚。' },
    ],
    bookHere: '在这里预订',
    ctaTitle: '还没定好日期？',
    ctaText: '把交楼日期告诉我们，我们围着它安排档期。不用订金，不用填表，发个信息就好。',
    ctaButton: '发送我的交楼日期',
  },

  protocol: {
    eyebrow: '我们的流程',
    title: 'Kleaner 装修后清洁三阶段流程',
    lead: '三个阶段，顺序固定，每一次都一样。把工序讲清楚，是比较两份报价唯一诚实的方式。',
    stages: [
      {
        number: '01',
        title: '除尘',
        text: '碎屑必须被带出单位，而不是在单位里被挪来挪去，否则后面做什么都不算数。',
        image: '/images/protocol-1.jpg',
        imageAlt: '清洁人员在空置单位里用 HEPA 吸尘机清理满是灰尘的新地砖。',
        items: [
          { text: 'HEPA 吸尘处理地面、墙面与天花' },
          { text: '高处擦拭：层板、门窗框、脚线与线槽' },
          { text: '按地材处理：瓷砖、云石、木地板、乙烯基与水泥' },
          { text: '清除新瓷砖上的水泥膜与残留' },
          {
            text: '天花、窗户外侧、冷气翅片与柜子内部',
            confirm:
              '天花、窗户外侧、冷气翅片与柜子内部是否包含在标准装修后清洁范围内，还是其中某些需要另外收费？',
          },
        ],
      },
      {
        number: '02',
        title: '深层清洁',
        text: '第一周里人会碰到的每一个表面，在灰尘量降下来之后处理。',
        image: '/images/protocol-2.jpg',
        imageAlt: '清洁人员擦拭刚装好的厨房柜子内部。',
        items: [
          { text: '柜子与衣橱内部、层板与抽屉轨道' },
          { text: '玻璃、镜面、窗轨与推拉门滑槽' },
          { text: '卫浴洁具、水龙头、花洒与地漏' },
          { text: '开关、插座、门把、铰链与灯具' },
          { text: '手工清除油漆点、玻璃胶痕与胶水残留' },
        ],
      },
      {
        number: '03',
        title: '除甲醛处理与空气及表面消毒',
        text: '把一个干净的单位，和一个可以住进去的单位区分开来的，就是这个阶段。',
        image: '/images/protocol-3.jpg',
        imageAlt: '技术人员在新做的夹板衣橱旁用手持检测仪读取空气数据。',
        items: [
          { text: '全屋施作 Formaldehyde Filter 除甲醛处理' },
          { text: '最后一道工序：空气及表面消毒' },
          { text: '处理重点放在嵌入式家具、衣橱与柜体，人造板都在那里' },
          {
            text: '处理前后各用手持检测仪读取一次',
            confirm:
              '是否每一单都会做处理前后的读数，还是客户要求时才做？我们宁可承诺小一点，但每次都做到。',
          },
          {
            text: 'Formaldehyde Filter 除甲醛处理具体是什么',
            confirm:
              '请用我们可以公开的措辞说明 Formaldehyde Filter 除甲醛处理是什么。在您告知之前，本页刻意不提任何化学成分、方法或产品名称。',
          },
        ],
      },
    ],
  },

  proof: {
    eyebrow: '实证',
    title: '处理前后，用仪器说话',
    lead: '清洁公司可以说空气变好了，只有读数能证明。我们自己做的读数，测到了就登在这里。',
    empty: {
      title: '首批实测工单的读数会放在这里',
      text: '在我们有自己的读数之前，这个表格保持空白。我们不会放示范数字、图库数据，或任何没有测过的百分比。',
    },
    columns: { property: '物业类型', sqft: '建筑面积', before: '处理前', after: '处理后', date: '日期' },
    unit: 'ppm',
    sqftUnit: '平方尺',
    confirm:
      '首批工单测完后，把读数（物业类型、建筑面积、处理前、处理后、日期）发给我们，会直接写进 src/data/readings.json。',
    slider: {
      label: '拖动以对比处理前后',
      caption: '拖动以对比处理前后。在拿到实际工单照片之前，这里是占位图。',
      beforeLabel: '处理前',
      afterLabel: '处理后',
      beforeAlt: '装修后清洁之前的房间，地面满是施工粉尘。',
      afterAlt: '同一个房间在装修后清洁之后。',
    },
  },

  pricing: {
    eyebrow: '价格',
    title: '现在就算出您的价格',
    lead: '装修后清洁按建筑面积计费。两项空气处理按单收固定价，与单位大小无关。',
    rateLine: '每平方尺建筑面积，一次性服务',
    recommended: '推荐',
    perSqft: '每平方尺 {rate}',
    perSqftPlusJob: '每平方尺 {rate}，另加每单 {price}',
    packages: [
      {
        key: 'dustFree',
        name: '除尘版',
        tagline: '只做装修后清洁。',
        waLabel: '除尘版（装修后清洁）',
        includes: ['第一阶段 除尘', '第二阶段 深层清洁'],
      },
      {
        key: 'moveInReady',
        name: '入住无忧版',
        tagline: '清洁，加上清洁碰不到的那一部分。',
        waLabel: '入住无忧版（清洁 + 除甲醛处理）',
        includes: ['第一阶段 除尘', '第二阶段 深层清洁', 'Formaldehyde Filter 除甲醛处理'],
      },
      {
        key: 'familySafe',
        name: '家人安心版',
        tagline: '全部工序，包含最后一道消毒。',
        waLabel: '家人安心版（清洁 + 除甲醛处理 + 消毒）',
        includes: [
          '第一阶段 除尘',
          '第二阶段 深层清洁',
          'Formaldehyde Filter 除甲醛处理',
          '空气及表面消毒',
        ],
      },
    ],
    builder: {
      heading: '您的报价',
      propertyType: '物业类型',
      propertyTypes: ['公寓', '有地房产', '店屋', '办公室', '餐厅'],
      area: '地区或项目名称',
      areaPlaceholder: 'Mont Kiara',
      sqft: '建筑面积（平方尺）',
      sqftHint: '300 至 10,000 平方尺之间。数字在您的买卖合约或平面图上。',
      sqftTooBig: '超过 10,000 平方尺需要先上门勘察再报价。请用 WhatsApp 联系我们安排上门。',
      sqftTooSmall: '请输入 300 平方尺或以上的建筑面积。',
      packageLabel: '配套',
      addOns: '加购沙发或床垫清洗',
      addOnsHint: '可选。同一次上门，价格与预订表一致。',
      handover: '交楼日期',
      moveIn: '入住日期',
      totalLabel: '预估总额',
      totalHint: '这是按本页价格算出的预估，不是订金，也不是合约。',
      totalPending: '另行报价',
      dateLocale: 'zh-Hans',
      book: '立即预订',
      sendQuote: '用 WhatsApp 发送报价',
      noJs: '下表已列出三个配套在 600、1,000 与 2,200 平方尺的价格。其他面积，把您的建筑面积乘以上方单价，再加上配套价格即可。',
      wa: {
        intro: '你好 Kleaner，我想预订装修后清洁。',
        property: '物业',
        packageLine: '配套',
        addOnsLine: '加购',
        total: '预估总额',
        handover: '交楼',
        moveIn: '入住',
      },
    },
    examples: {
      title: '三种常见面积的算法',
      lead: '下面每一个数字，都是建筑面积乘以单价，再加上该配套里处理项目的固定价。',
      sizeColumn: '建筑面积',
      note: '清洁按平方尺计。两项处理按单计，所以单位越大，它们在总价中的占比越小。',
    },
    confirmMinimum:
      '装修后清洁是否设有最低消费或最低面积？目前的计算器两者都没有设。',
    confirmCommercial:
      '店屋、办公室与餐厅是否与住宅同样按每平方尺 RM1.20 计费？目前计算器对五种物业类型一律套用同一单价。',
    confirmBooking:
      'BookingKoala 预订流程中，装修后清洁的直接网址是什么？目前「立即预订」指向 kleaner.my/booknow/ 的首页，客户要多点一次。',
  },

  guarantee: {
    eyebrow: '保障',
    title: '您得到的保障',
    cards: [
      {
        icon: 'guarantee',
        title: '满意保证',
        text: '对清洁不满意？我们重做或退款。这是 Kleaner 一直公开的保证，这项服务同样适用。',
      },
      {
        icon: 'shield',
        title: '防盗政策',
        text: '每位服务人员都经过背景审查，防盗政策全文刊登在主网站上。入住前的空置单位，正是这一点最要紧的时候。',
      },
      {
        icon: 'wind',
        title: '读数保证',
        text: '草稿。以读数为准的保证会是这一页上最有力的一条，所以在背后那个数字由您定下来之前，我们不会先登出去。',
        confirm:
          '您是否要设读数保证，门槛定在多少？例如：处理后读数若未低于约定数值，免费重做一次。给我们一个您在每个单位都愿意承担的数字，我们来把它写成条款。',
      },
    ],
    antiTheft: {
      text: '我们的防盗政策全文刊登于',
      linkLabel: 'kleaner.my',
    },
  },

  whoBooks: {
    eyebrow: '谁会订这个',
    title: '不打算「先住住看」的那些人',
    imageAlt: '一家年轻的马来西亚家庭站在新居空屋的门口。',
    items: [
      {
        icon: 'home',
        title: '新手父母',
        text: '宝宝一天里大半时间都在地板高度活动，而房里的柜子是最新的。入住那晚，不是开始担心的时候。',
      },
      {
        icon: 'shield',
        title: '家里有长辈或哮喘患者',
        text: '甲醛最先刺激的就是眼睛、鼻子和喉咙，而这几处本来就是家里最敏感的。',
      },
      {
        icon: 'handshake',
        title: '新租约前的房东',
        text: '一个清洁到有读数可查的单位，交租更快、看房更好看，也让新租客没有争议的由头。',
      },
      {
        icon: 'tag',
        title: '办公室与店屋装修',
        text: '新装修用的是同样的夹板与胶水，而第一个星期一就会有一整队人坐进去。',
      },
    ],
  },

  faq: {
    eyebrow: '常见问题',
    title: '预订之前',
    items: [
      {
        q: '整个工程要做多久？',
        a: '视建筑面积以及师傅留下多少碎屑而定。预订时我们会和您确认时间范围，团队做到清单完成为止，而不是做到时间到为止。',
        confirm:
          '按面积区分的典型工时与人手是多少？例如「1,000 平方尺、三名清洁人员、约六小时」这样一句，就可以替换这个答案。',
      },
      {
        q: '应该在家具进场之前还是之后做？',
        a: '之前。在嵌入式家具装好之后、家具与窗帘进场之前预订。空屋意味着每一个积灰或释放甲醛的表面都碰得到，新家具也不会一进门就落在水泥灰上。',
      },
      {
        q: '对婴儿、孕妇和宠物安全吗？',
        a: '这项服务的目的就是让单位更适合搬进去住，我们用的是 Kleaner 一贯的环保系列产品。预订时我们会告诉您处理后需要在外面待多久。',
        confirm:
          '除甲醛处理与消毒之后的返回时间是多久？婴儿、孕妇或宠物是否另有指引？没有拿到数字之前，我们不会写上去。',
      },
      {
        q: '做完之后还会有味道吗？',
        a: '可能会，而且气味本来就不是可靠的判断依据。新油漆与新木材的气味并不是甲醛，甲醛也可能低到您闻不出来。所以我们看仪器，不靠鼻子。',
      },
      {
        q: '我的装修师傅已经清过了。',
        a: '师傅清的是碎屑，那是另一回事。那不是 HEPA 除尘，碰不到柜子内部或冷气翅片，也完全没有处理嵌入式家具释放出来的气体。',
      },
      {
        q: '开两个星期的窗不就好了吗？',
        a: '通风有帮助又不花钱，所以还是要开。但它不会让来源停下来。美国环保署把人造板的释放半衰期估在大约 1.5 至 2 年，窗户尽完它那一份之后，柜子还在继续释放。',
      },
      {
        q: '你们有服务我这一区吗？',
        a: '我们的服务范围涵盖吉隆坡与雪兰莪，包括 PJ、Subang Jaya、Shah Alam、Puchong、Cheras、Ampang、Damansara、Klang、Cyberjaya 与 Putrajaya。不在名单上？把地址用 WhatsApp 发给我们，我们帮您确认。',
      },
      {
        q: '除甲醛处理里面到底是什么？',
        a: '与其含糊其辞，我们宁可先空着。用 WhatsApp 问我们，在团队上门之前，我们会明确告诉您您的单位会用到什么。',
        confirm:
          '请用我们可以公开的措辞说明 Formaldehyde Filter 除甲醛处理是什么。在您告知之前，本页不提任何化学成分、方法或产品名称。',
      },
      {
        q: '你们清柜子内部和冷气吗？',
        a: '柜子与衣橱内部属于第二阶段，钻孔粉尘就积在那里。冷气翅片同样会积装修灰，我们做到什么程度，值得在预订前先确认。',
        confirm:
          '标准范围对冷气机内部做到什么程度？完整的冷气服务是否要另外预订？我们宁可先写得保守，也不猜。',
      },
      {
        q: '怎么预订？',
        a: '在本页算出价格，然后用 WhatsApp 发给我们，或直接在线上预订。如果还没有确定日期，把交楼日期发给我们，我们会围着它留出合适的档期。',
      },
    ],
  },

  reviews: { eyebrow: '客户评价', title: '客户怎么说' },
  areas: {
    eyebrow: '服务范围',
    title: '我们清洁的地区',
    intro: '我们的服务范围涵盖吉隆坡与雪兰莪，包括：',
    outro: '不在名单上？把地址用 WhatsApp 发给我们，我们帮您确认是否覆盖。',
  },

  trust: {
    items: [
      { icon: 'shield', title: '经审查与培训', text: '服务人员均经背景审查。' },
      { icon: 'tag', title: '没有隐藏收费', text: '价格实在，事前报清楚。' },
      { icon: 'leaf', title: '环保清洁用品', text: '在您家中使用安全的清洁产品。' },
      { icon: 'guarantee', title: '满意保证', text: '不满意？我们重做或退款。' },
      { icon: 'clock', title: '超过 100,000 工时', text: '至今累积的清洁工时。' },
      { icon: 'calendar', title: '线上管理', text: '预订可以线上修改与管理。' },
    ],
    policy: { text: '请参阅我们的', linkLabel: '防盗政策' },
  },

  crossSell: {
    eyebrow: 'Kleaner 其他服务',
    title: '也要搬家吗？',
    items: [
      {
        icon: 'home',
        title: 'Movers by Kleaner 搬家服务',
        text: '清洁与搬家就在同两个星期里。一家公司、一个时间表，没有东西会在单位准备好之前先到。',
        href: SITE.moversSite,
        cta: '查看 Movers by Kleaner',
      },
      {
        icon: 'sofa',
        title: '沙发与床垫清洗',
        text: '旧沙发和床垫要搬进新家？同一次上门顺便洗干净，别把上一间屋子搬进这一间。',
        href: ABSOLUTE_PAGES.sofaMattress,
        cta: '查看沙发与床垫价格',
      },
      {
        icon: 'wind',
        title: '冷气服务',
        text: '装修灰会塞进翅片与风轮。工程之后做一次保养，冷气才不会每晚把灰吹回您身上。',
        href: SITE.airconUrl,
        cta: '查看冷气服务',
      },
    ],
  },

  ctaBand: {
    title: '在搬进去之前，干净到连读数都干净',
    text: '把交楼日期发给我们，我们围着它安排档期。装修后清洁与除甲醛处理，服务吉隆坡与雪兰莪。',
  },

  sources: {
    eyebrow: '资料来源',
    title: '本页关于甲醛的说法出自哪里',
    lead: '本页每一项关于甲醛的说法，都可以追到下面四份文件。它们都不是我们写的。文件里没有的，本页就不会写。',
    label: '来源',
    items: [
      {
        claim:
          '甲醛的室内空气短期指导值为 0.1 mg/m3（约 0.08 ppm），以 30 分钟平均值计，用以防止感官刺激。',
        source: '世界卫生组织《室内空气质量指南：特定污染物》（2010）甲醛章节',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK138711/',
      },
      {
        claim:
          '在马来西亚，非工业工作场所的室内空气甲醛可接受限值为 0.1 ppm，以八小时时间加权平均值计。',
        source: '马来西亚职业安全与健康局（DOSH）《室内空气质量行业实务守则 2010》',
        url: 'https://medicine.um.edu.my/pdf/OSHE/resources/4.%20Industrial%20Code%20of%20Practice%20(ICOP)/ICOP%20INDOOR%20AIR%20QUALITY%20(IAQ)%202010.pdf',
      },
      {
        claim:
          '在住宅中，甲醛最主要的来源是以脲醛树脂黏合的人造板：刨花板、硬木夹板饰面板与中密度纤维板（MDF）。甲醛也是胶水与黏合剂的成分之一，并在部分油漆与涂料中用作防腐剂。在这几种人造板中，MDF 的释放量一般最高。',
        source: '美国环境保护署《关于甲醛与室内空气质量，我应该知道什么？》',
        url: 'https://www.epa.gov/indoor-air-quality-iaq/what-should-i-know-about-formaldehyde-and-indoor-air-quality',
      },
      {
        claim:
          '人造板的释放量会随时间下降，但不会停止，估计释放半衰期约为 1.5 至 2 年。',
        source: '美国环境保护署《甲醛室内空气暴露评估》',
        url: 'https://www.epa.gov/formaldehyde/formaldehyde-emission-standards-composite-wood-products',
      },
    ],
    carcinogen:
      '补充说明：国际癌症研究机构（IARC）依据人类与动物实验的充分证据，将甲醛列为第1类，对人类致癌。我们在这里陈述一次，作为背景，本页其他地方不再提。我们不对任何人的健康作出任何声称，任何清洁公司都不能。',
    note:
      '我们不声称的事：我们不承诺清除到一点不剩，不把这项处理说成永久、认证或医疗等级，不对病毒作任何声称，也不对任何人的健康作出承诺。上面的指导数值是公开标准，不是我们保证在您单位里达到的结果。',
  },

  stickyBook: '计算报价',
}
