// 用户/车辆数据接口 —— 供 FastGPT 的 HTTP 请求节点调用
// 部署到 Vercel 后，访问方式：
//   GET /api/users            → 返回全部用户
//   GET /api/users?userId=U001  → 按 ID 查询
//   GET /api/users?phone=13800000001 → 按手机号查询
// 返回 JSON。

const users = [
  {
    userId: 'U001',
    name: '张三',
    phone: '13800000001',
    memberLevel: '金卡会员',
    vehicles: [
      { plate: '京A12345', brand: '宝马', model: 'X3', year: 2022, mileage: 28000, lastService: '2026-04-10' },
      { plate: '京B67890', brand: '奥迪', model: 'A4L', year: 2021, mileage: 45000, lastService: '2026-02-20' }
    ]
  },
  {
    userId: 'U002',
    name: '李四',
    phone: '13800000002',
    memberLevel: '银卡会员',
    vehicles: [
      { plate: '沪C99999', brand: '比亚迪', model: '汉 EV', year: 2023, mileage: 15000, lastService: '2026-05-15' }
    ]
  },
  {
    userId: 'U003',
    name: '王五',
    phone: '13800000003',
    memberLevel: '普通会员',
    vehicles: [
      { plate: '粤B88888', brand: '特斯拉', model: 'Model Y', year: 2024, mileage: 8000, lastService: '2026-06-01' }
    ]
  }
];

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

  let result = users;
  if (userId) {
    result = users.filter(u => u.userId.toLowerCase() === String(userId).toLowerCase());
  } else if (phone) {
    result = users.filter(u => u.phone === phone);
  } else if (name) {
    result = users.filter(u => u.name.includes(name));
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
};
