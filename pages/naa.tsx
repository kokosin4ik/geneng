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
            <Select>
              <Option value={ReadingMode.FirstStartCodon}>First start-codon</Option>
              <Option value={ReadingMode.AllPotentialCodons}>All potential start-codons</Option>
              {/* disabled for now */}
              <Option value="2" disabled>Homo sapiens</Option>
              <Option value="3" disabled>Mus musculus</Option>
              <Option value="4" disabled>Rattus norvegicus</Option>
              <Option value="5" disabled>Drosophila melanogaster</Option>
              <Option value="6" disabled>Caenorhabditis elegans</Option>
              <Option value="7" disabled>Saccharomyces cerevisiae</Option>
              <Option value="8" disabled>Escherichia coli</Option>
              <Option value="9" disabled>Bacillus subtilis</Option>
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
                  <Radio value={AaAbbreviations.SingleLetter}>Single-letter</Radio>
                  <Radio value={AaAbbreviations.ThreeLetters}>Three-letter</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Space>
        </Col>
      </Row>

      <Form.Item name="outputProtein" label='Protein (Output)'>
        <TextArea
          allowClear
          disabled
          autoSize
          bordered
          placeholder='Протеиновая последовательность'
        />
      </Form.Item>

      <Form.Item name="outputItself" label='cDNA or RNA sequence of the protein itself (Output)'>
        <TextArea
          autoSize
          allowClear
          bordered
          placeholder='Последовательность cDNA / RNA'
        />
      </Form.Item>
    </Form>

  );
}

export default Naa
