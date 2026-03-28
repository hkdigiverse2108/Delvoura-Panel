import { Card, Row, Col } from "antd";
import { UserOutlined, ShoppingOutlined, FileTextOutlined, AppstoreOutlined } from "@ant-design/icons";

const DashboardHome = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-500">Welcome to your admin panel</p>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <UserOutlined className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <h3 className="text-2xl font-bold text-black">1,234</h3>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg  flex items-center justify-center">
                <ShoppingOutlined className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <h3 className="text-2xl font-bold text-black">567</h3>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg  flex items-center justify-center">
                <AppstoreOutlined className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Categories</p>
                <h3 className="text-2xl font-bold text-black">23</h3>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg  flex items-center justify-center">
                <FileTextOutlined className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Blog Posts</p>
                <h3 className="text-2xl font-bold text-black">89</h3>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome;