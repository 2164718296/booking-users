// 用户/车辆履历接口 —— 供 FastGPT 的 HTTP 请求节点调用
// 部署到 Vercel 后，访问方式：
//   GET /api/users            → 返回用户及车辆履历
//   GET /api/users?userId=U001  → 按 ID 查询
//   GET /api/users?phone=13800000001 → 按手机号查询
// 返回 JSON。当前数据为"一个人 + 一辆车 + 历史履历记录"。

const data = {
  userId: 'U001',
  name: '张三',
  phone: '13800000001',
  memberLevel: '金卡会员',
  registerDate: '2022-03-15',
  car: {
    plate: '京A12345',
    brand: '宝马',
    model: 'X3',
    year: 2022,
    mileage: 28000,
    vin: 'LBVXXSAR0NMA12345',
    color: '矿石白',
    insuranceExpire: '2027-03-14',
    lastService: '2026-06-28'
  },
  // 历史履历：按时间倒序，最近的在前
  history: [
    {
      date: '2026-06-28',
      type: '轮胎维修',
      title: '右前轮胎被钉扎破',
      description: '用户反馈行驶中右前轮胎漏气，到店检查发现被钉子扎破，进行补胎修复，复测胎压正常。',
      mileage: 28000,
      cost: 80,
      status: '已完成'
    },
    {
      date: '2026-06-05',
      type: '常规保养',
      title: '2.8万公里常规保养 + 更换刹车片',
      description: '常规小保养：更换机油（0W-20 全合成 5L）、机油滤芯；检查发现前刹车片磨损至临界，一并更换前刹车片。',
      mileage: 27500,
      cost: 1280,
      status: '已完成'
    },
    {
      date: '2026-02-15',
      type: '故障维修',
      title: '刹车系统异响',
      description: '用户反馈低速刹车时左前轮有金属摩擦异响，检查为刹车盘磨损不均，更换左前刹车盘并打磨刹车片。',
      mileage: 25000,
      cost: 1850,
      status: '已完成'
    },
    {
      date: '2025-11-10',
      type: '事故维修',
      title: '左侧车门剐蹭喷漆',
      description: '倒车时剐蹭左侧前车门，钣金修复并喷漆，左前门外观恢复原状。',
      mileage: 22000,
      cost: 2500,
      status: '已完成'
    },
    {
      date: '2025-08-20',
      type: '常规保养',
      title: '2万公里常规保养',
      description: '更换机油、机油滤芯、空气滤芯、空调滤芯；全车油水检查正常。',
      mileage: 20000,
      cost: 980,
      status: '已完成'
    },
    {
      date: '2025-03-05',
      type: '故障维修',
      title: '空调不制冷',
      description: '用户反馈空调制冷效果差，检查为冷媒不足，补充冷媒并修复管路微小渗漏点。',
      mileage: 16000,
      cost: 420,
      status: '已完成'
    }
  ]
};

module.exports = (req, res) => {
  // 允许跨域，方便 FastGPT 云端调用 / 本地调试
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const { userId, phone, name } = req.query;

  // 当前仅有一个用户，按参数过滤（不匹配则返回空 data）
  let matched = true;
  if (userId && String(userId).toLowerCase() !== data.userId.toLowerCase()) matched = false;
  else if (phone && phone !== data.phone) matched = false;
  else if (name && !data.name.includes(name)) matched = false;

  res.status(200).json({
    success: matched,
    count: matched ? 1 : 0,
    data: matched ? [data] : []
  });
};
