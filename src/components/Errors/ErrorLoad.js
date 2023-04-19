import { Alert, Space } from 'antd'
const ErrorLoad = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Load error" description="Data failed to load" type="error" showIcon />
  </Space>
)
export default ErrorLoad
