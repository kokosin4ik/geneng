import React from 'react'

import type { NextPage } from 'next'

import { Switch, Col, Typography, Form, Input, PageHeader, Radio, Row, Select, Space, Tag, Tooltip, InputNumber } from 'antd';


const { TextArea } = Input;
const { Option } = Select;

const TEXT_AREA_SIZE = 5;

const a_d = {
  'CYS': 'C', 'ASP': 'D', 'SER': 'S', 'GLN': 'Q', 'LYS': 'K',
  'ILE': 'I', 'PRO': 'P', 'THR': 'T', 'PHE': 'F', 'ASN': 'N',
  'GLY': 'G', 'HIS': 'H', 'LEU': 'L', 'ARG': 'R', 'TRP': 'W',
  'ALA': 'A', 'VAL': 'V', 'GLU': 'E', 'TYR': 'Y', 'MET': 'M'
}


function swap(json: any) {
  var ret: any = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

function replaceYFrom(obj: any, getYFrom: any) {
  var ret: any = {};
  for (var key in obj) {
    ret[key] = getYFrom[obj[key]];
  }
  return ret;
}

function transformKeys(obj: any, transformFn: Function) {
  var ret: any = {};
  for (var key in obj) {
    ret[transformFn(key)] = obj[key];
  }
  return ret;
}


function transformToLower(obj: any) {
  var ret: any = {};
  for (var key in obj) {
    ret[key.toLowerCase()] = obj[key].toLowerCase();
  }
  return ret;
}

const a_d_2 = swap(a_d)

const triplets = {
  'ATA': 'I', 'ATC': 'I', 'ATT': 'I', 'ATG': 'M',
  'ACA': 'T', 'ACC': 'T', 'ACG': 'T', 'ACT': 'T',
  'AAC': 'N', 'AAT': 'N', 'AAA': 'K', 'AAG': 'K',
  'AGC': 'S', 'AGT': 'S', 'AGA': 'R', 'AGG': 'R',
  'CTA': 'L', 'CTC': 'L', 'CTG': 'L', 'CTT': 'L',
  'CCA': 'P', 'CCC': 'P', 'CCG': 'P', 'CCT': 'P',
  'CAC': 'H', 'CAT': 'H', 'CAA': 'Q', 'CAG': 'Q',
  'CGA': 'R', 'CGC': 'R', 'CGG': 'R', 'CGT': 'R',
  'GTA': 'V', 'GTC': 'V', 'GTG': 'V', 'GTT': 'V',
  'GCA': 'A', 'GCC': 'A', 'GCG': 'A', 'GCT': 'A',
  'GAC': 'D', 'GAT': 'D', 'GAA': 'E', 'GAG': 'E',
  'GGA': 'G', 'GGC': 'G', 'GGG': 'G', 'GGT': 'G',
  'TCA': 'S', 'TCC': 'S', 'TCG': 'S', 'TCT': 'S',
  'TTC': 'F', 'TTT': 'F', 'TTA': 'L', 'TTG': 'L',
  'TAC': 'Y', 'TAT': 'Y',
  'TGC': 'C', 'TGT': 'C', 'TGG': 'W',
}

const tr_2 = transformToLower(replaceYFrom(triplets, a_d_2))

tr_2['taa'] = '[stop]'
tr_2['tag'] = '[stop]'
tr_2['tga'] = '[stop]'

const tr_2_u = transformToLower(transformKeys(tr_2, (key: string) => key.replace(/t/g, 'u')))

console.log(tr_2, tr_2_u)

const getComplimentary = (string: string) => {
  const complim = {
    'a': 'u',
    'u': 'a',
    't': 'a',
    'c': 'g',
    'g': 'c',
  }
  // @ts-ignore
  return [...string].map((s: keyof typeof complim) => complim[s]).join('')
}

interface IFormValues {
  input: string;
  number: number;
  sub: string;
  compl: boolean;
}

function setCharAt(str: string, index: number, chr: string) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

const Multimerization: NextPage = () => {
  const [form] = Form.useForm<IFormValues>();
  const [result, setResult] = React.useState('')



  const onValuesChange = (values: any, allValues: IFormValues) => {
    setResult('')
    if (
      (allValues.input?.length === 3)
      && allValues.number
      && allValues.sub
    ) {
      console.log(allValues)

      const triplet = allValues.input.toLowerCase();
      const dict = triplet.includes('u') ? tr_2_u : tr_2;

      const mutation = setCharAt(triplet, allValues.number - 1, allValues.sub.toLowerCase())

      if (!allValues.compl) {
        setResult(dict[triplet] + '->' + dict[mutation])
      } else {
        console.log(getComplimentary(triplet))
        setResult(tr_2_u[getComplimentary(triplet)] + '->' + tr_2_u[getComplimentary(mutation)])
      }

    }
  }

  return (
    <>
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
        <Row gutter={64}>

          <Col span={3}>
            <Form.Item name="input" label='Триплет'>
              <Input
                maxLength={3}
                placeholder='Триплет'
              />
            </Form.Item>
          </Col>
          <Col span={3}>

            <Form.Item name="number" label="Номер замены">
              <InputNumber min={1} max={3} placeholder="Номер"/>
            </Form.Item>
          </Col>
          <Col span={3}>

            <Form.Item name="sub" label='Замена'>
              <Input
                maxLength={1}
                placeholder='Замена'
              />
            </Form.Item>
          </Col>

          <Col span={3}>

            <Form.Item name="compl" label='Комплиментарна'>
              <Switch
              />
            </Form.Item>
          </Col>
        </Row>


        <Row>
          {result}
        </Row>
      </Form>
    </>
  );
}

export default Multimerization