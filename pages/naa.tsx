import React from 'react'

import type { NextPage } from 'next'

import { Checkbox, Col, Form, Input, Radio, Row, Select, Space } from 'antd';
import { invert } from '../utils/string';

const { TextArea } = Input;
const { Option } = Select;

const TEXT_AREA_SIZE = 5;

enum ReadingMode {
  AllPotentialCodons = 'all-potential-start-codons',
  FirstStartCodon = 'first-start-codon',
}

enum AaAbbreviations {
  SingleLetter = 'single-letter',
  ThreeLetters = 'three-letter'
}


interface IFormValues {
  input: string;
  readingMode: ReadingMode,
  aaAbbreviations: AaAbbreviations,
  outputProtein: string,
  outputItself: string,
}

const Naa: NextPage = () => {
  const [form] = Form.useForm<IFormValues>();

  const onCheckboxChange = () => {
    const inputValue: string = form.getFieldValue('input') || ''
    form.setFieldsValue({ 'input': invert(inputValue) })
  }

  const onValuesChange = (values: any, allValues: any) => {
    console.log(values, allValues)
  }

  return (
    <Form
      layout="vertical"
      form={form}
      size='small'
      onValuesChange={onValuesChange}
      initialValues={{
        readingMode: 'first-start-codon',
        aaAbbreviations: 'single-letter'
      }}

    >
      <Form.Item name="input" label='cDNA or RNA sequence (Input)'>
        <TextArea
          rows={TEXT_AREA_SIZE}
          showCount
          allowClear
          bordered
          placeholder='Последовательность cDNA / RNA'
          // TODO add validation of input
        />
      </Form.Item>

      <Row gutter={64}>
        <Col span={6}>
          <Form.Item>
            <Checkbox onChange={onCheckboxChange}>
              Invert
            </Checkbox>
          </Form.Item>
        </Col>

        <Col span={6} offset={8}>
          <Form.Item name="readingMode" label="Reading mode">
            <Select
              placeholder="Select a option and change input text above"
            >
              <Option value="first-start-codon">First start-codon</Option>
              <Option value="all-potential-start-codons">All potential start-codons</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Space align="end">
            <Form.Item
              name="aaAbbreviations"
              label="AA abbreviations:"
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="single-letter">Single-letter</Radio>
                  <Radio value="three-letter">Three-letter</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Space>
        </Col>
      </Row>

      <Form.Item name="outputProtein" label='Protein (Output)'>
        <TextArea
          rows={TEXT_AREA_SIZE}
          showCount
          allowClear
          bordered
          placeholder='Протеиновая последовательность'
        />
      </Form.Item>

      <Form.Item name="outputItself" label='cDNA or RNA sequence of the protein itself (Output)'>
        <TextArea
          rows={TEXT_AREA_SIZE}
          showCount
          allowClear
          bordered
          placeholder='Последовательность cDNA / RNA'
        />
      </Form.Item>
    </Form>

  );
}

export default Naa
