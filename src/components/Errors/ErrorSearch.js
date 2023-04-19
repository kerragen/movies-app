import { Alert, Space } from 'antd'
const ErrorSearch = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Oops!" description="Nothing was found" type="info" showIcon />
  </Space>
)
export default ErrorSearch
