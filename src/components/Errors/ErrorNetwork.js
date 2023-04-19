import { Alert, Space } from 'antd'
const ErrorNetwork = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
      bottom: '500px',
    }}
  >
    <Alert message="Network error" description="Connect to the internet to load the page" type="error" showIcon />
  </Space>
)
export default ErrorNetwork
