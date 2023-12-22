import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
// import Database from '@ioc:Adonis/Lucid/Database'

import Feature from 'App/Models/Feature'

export default class FeaturesController {
  // private tableName = 'features'

  public async index() {
    // const features = Database.from(this.tableName).select('*')
    const features = await Feature.all()
    return features
  }

  public async store({ request, response }: HttpContextContract) {
    const newFeatureSchema = schema.create({
      feature_name: schema.string({ trim: true }),
      feature_value: schema.boolean(),
    })
    const payload = await request.validate({ schema: newFeatureSchema })
    // const newFeature = await Database.table(this.tableName).insert(payload)
    const newFeature = await Feature.create(payload)
    response.status(201)
    return newFeature
  }

  public async show({ params }: HttpContextContract) {
    const feature = await Feature.findOrFail(params.id)
    return feature
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body()
    const feature = await Feature.findOrFail(params.id)
    feature.$attributes = { ...feature.$attributes, ...body }
    feature.save()
    return feature
  }

  public async destroy({ params }: HttpContextContract) {
    const feature = await Feature.findOrFail(params.id)
    await feature.delete()
    return feature
  }
}
