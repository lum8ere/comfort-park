// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package query

import (
	"context"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"gorm.io/gorm/schema"

	"gorm.io/gen"
	"gorm.io/gen/field"

	"gorm.io/plugin/dbresolver"

	"backed-api-v2/libs/2_generated_models/model"
)

func newProjectReview(db *gorm.DB, opts ...gen.DOOption) projectReview {
	_projectReview := projectReview{}

	_projectReview.projectReviewDo.UseDB(db, opts...)
	_projectReview.projectReviewDo.UseModel(&model.ProjectReview{})

	tableName := _projectReview.projectReviewDo.TableName()
	_projectReview.ALL = field.NewAsterisk(tableName)
	_projectReview.ID = field.NewString(tableName, "id")
	_projectReview.RootID = field.NewString(tableName, "root_id")
	_projectReview.FirstName = field.NewString(tableName, "first_name")
	_projectReview.LastName = field.NewString(tableName, "last_name")
	_projectReview.Comment = field.NewString(tableName, "comment")
	_projectReview.Photos = field.NewString(tableName, "photos")
	_projectReview.CreatedAt = field.NewTime(tableName, "created_at")

	_projectReview.fillFieldMap()

	return _projectReview
}

type projectReview struct {
	projectReviewDo

	ALL       field.Asterisk
	ID        field.String
	RootID    field.String
	FirstName field.String
	LastName  field.String
	Comment   field.String
	Photos    field.String
	CreatedAt field.Time

	fieldMap map[string]field.Expr
}

func (p projectReview) Table(newTableName string) *projectReview {
	p.projectReviewDo.UseTable(newTableName)
	return p.updateTableName(newTableName)
}

func (p projectReview) As(alias string) *projectReview {
	p.projectReviewDo.DO = *(p.projectReviewDo.As(alias).(*gen.DO))
	return p.updateTableName(alias)
}

func (p *projectReview) updateTableName(table string) *projectReview {
	p.ALL = field.NewAsterisk(table)
	p.ID = field.NewString(table, "id")
	p.RootID = field.NewString(table, "root_id")
	p.FirstName = field.NewString(table, "first_name")
	p.LastName = field.NewString(table, "last_name")
	p.Comment = field.NewString(table, "comment")
	p.Photos = field.NewString(table, "photos")
	p.CreatedAt = field.NewTime(table, "created_at")

	p.fillFieldMap()

	return p
}

func (p *projectReview) GetFieldByName(fieldName string) (field.OrderExpr, bool) {
	_f, ok := p.fieldMap[fieldName]
	if !ok || _f == nil {
		return nil, false
	}
	_oe, ok := _f.(field.OrderExpr)
	return _oe, ok
}

func (p *projectReview) fillFieldMap() {
	p.fieldMap = make(map[string]field.Expr, 7)
	p.fieldMap["id"] = p.ID
	p.fieldMap["root_id"] = p.RootID
	p.fieldMap["first_name"] = p.FirstName
	p.fieldMap["last_name"] = p.LastName
	p.fieldMap["comment"] = p.Comment
	p.fieldMap["photos"] = p.Photos
	p.fieldMap["created_at"] = p.CreatedAt
}

func (p projectReview) clone(db *gorm.DB) projectReview {
	p.projectReviewDo.ReplaceConnPool(db.Statement.ConnPool)
	return p
}

func (p projectReview) replaceDB(db *gorm.DB) projectReview {
	p.projectReviewDo.ReplaceDB(db)
	return p
}

type projectReviewDo struct{ gen.DO }

type IProjectReviewDo interface {
	gen.SubQuery
	Debug() IProjectReviewDo
	WithContext(ctx context.Context) IProjectReviewDo
	WithResult(fc func(tx gen.Dao)) gen.ResultInfo
	ReplaceDB(db *gorm.DB)
	ReadDB() IProjectReviewDo
	WriteDB() IProjectReviewDo
	As(alias string) gen.Dao
	Session(config *gorm.Session) IProjectReviewDo
	Columns(cols ...field.Expr) gen.Columns
	Clauses(conds ...clause.Expression) IProjectReviewDo
	Not(conds ...gen.Condition) IProjectReviewDo
	Or(conds ...gen.Condition) IProjectReviewDo
	Select(conds ...field.Expr) IProjectReviewDo
	Where(conds ...gen.Condition) IProjectReviewDo
	Order(conds ...field.Expr) IProjectReviewDo
	Distinct(cols ...field.Expr) IProjectReviewDo
	Omit(cols ...field.Expr) IProjectReviewDo
	Join(table schema.Tabler, on ...field.Expr) IProjectReviewDo
	LeftJoin(table schema.Tabler, on ...field.Expr) IProjectReviewDo
	RightJoin(table schema.Tabler, on ...field.Expr) IProjectReviewDo
	Group(cols ...field.Expr) IProjectReviewDo
	Having(conds ...gen.Condition) IProjectReviewDo
	Limit(limit int) IProjectReviewDo
	Offset(offset int) IProjectReviewDo
	Count() (count int64, err error)
	Scopes(funcs ...func(gen.Dao) gen.Dao) IProjectReviewDo
	Unscoped() IProjectReviewDo
	Create(values ...*model.ProjectReview) error
	CreateInBatches(values []*model.ProjectReview, batchSize int) error
	Save(values ...*model.ProjectReview) error
	First() (*model.ProjectReview, error)
	Take() (*model.ProjectReview, error)
	Last() (*model.ProjectReview, error)
	Find() ([]*model.ProjectReview, error)
	FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.ProjectReview, err error)
	FindInBatches(result *[]*model.ProjectReview, batchSize int, fc func(tx gen.Dao, batch int) error) error
	Pluck(column field.Expr, dest interface{}) error
	Delete(...*model.ProjectReview) (info gen.ResultInfo, err error)
	Update(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	Updates(value interface{}) (info gen.ResultInfo, err error)
	UpdateColumn(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
	UpdateColumnSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
	UpdateColumns(value interface{}) (info gen.ResultInfo, err error)
	UpdateFrom(q gen.SubQuery) gen.Dao
	Attrs(attrs ...field.AssignExpr) IProjectReviewDo
	Assign(attrs ...field.AssignExpr) IProjectReviewDo
	Joins(fields ...field.RelationField) IProjectReviewDo
	Preload(fields ...field.RelationField) IProjectReviewDo
	FirstOrInit() (*model.ProjectReview, error)
	FirstOrCreate() (*model.ProjectReview, error)
	FindByPage(offset int, limit int) (result []*model.ProjectReview, count int64, err error)
	ScanByPage(result interface{}, offset int, limit int) (count int64, err error)
	Scan(result interface{}) (err error)
	Returning(value interface{}, columns ...string) IProjectReviewDo
	UnderlyingDB() *gorm.DB
	schema.Tabler
}

func (p projectReviewDo) Debug() IProjectReviewDo {
	return p.withDO(p.DO.Debug())
}

func (p projectReviewDo) WithContext(ctx context.Context) IProjectReviewDo {
	return p.withDO(p.DO.WithContext(ctx))
}

func (p projectReviewDo) ReadDB() IProjectReviewDo {
	return p.Clauses(dbresolver.Read)
}

func (p projectReviewDo) WriteDB() IProjectReviewDo {
	return p.Clauses(dbresolver.Write)
}

func (p projectReviewDo) Session(config *gorm.Session) IProjectReviewDo {
	return p.withDO(p.DO.Session(config))
}

func (p projectReviewDo) Clauses(conds ...clause.Expression) IProjectReviewDo {
	return p.withDO(p.DO.Clauses(conds...))
}

func (p projectReviewDo) Returning(value interface{}, columns ...string) IProjectReviewDo {
	return p.withDO(p.DO.Returning(value, columns...))
}

func (p projectReviewDo) Not(conds ...gen.Condition) IProjectReviewDo {
	return p.withDO(p.DO.Not(conds...))
}

func (p projectReviewDo) Or(conds ...gen.Condition) IProjectReviewDo {
	return p.withDO(p.DO.Or(conds...))
}

func (p projectReviewDo) Select(conds ...field.Expr) IProjectReviewDo {
	return p.withDO(p.DO.Select(conds...))
}

func (p projectReviewDo) Where(conds ...gen.Condition) IProjectReviewDo {
	return p.withDO(p.DO.Where(conds...))
}

func (p projectReviewDo) Order(conds ...field.Expr) IProjectReviewDo {
	return p.withDO(p.DO.Order(conds...))
}

func (p projectReviewDo) Distinct(cols ...field.Expr) IProjectReviewDo {
	return p.withDO(p.DO.Distinct(cols...))
}

func (p projectReviewDo) Omit(cols ...field.Expr) IProjectReviewDo {
	return p.withDO(p.DO.Omit(cols...))
}

func (p projectReviewDo) Join(table schema.Tabler, on ...field.Expr) IProjectReviewDo {
	return p.withDO(p.DO.Join(table, on...))
}

func (p projectReviewDo) LeftJoin(table schema.Tabler, on ...field.Expr) IProjectReviewDo {
	return p.withDO(p.DO.LeftJoin(table, on...))
}

func (p projectReviewDo) RightJoin(table schema.Tabler, on ...field.Expr) IProjectReviewDo {
	return p.withDO(p.DO.RightJoin(table, on...))
}

func (p projectReviewDo) Group(cols ...field.Expr) IProjectReviewDo {
	return p.withDO(p.DO.Group(cols...))
}

func (p projectReviewDo) Having(conds ...gen.Condition) IProjectReviewDo {
	return p.withDO(p.DO.Having(conds...))
}

func (p projectReviewDo) Limit(limit int) IProjectReviewDo {
	return p.withDO(p.DO.Limit(limit))
}

func (p projectReviewDo) Offset(offset int) IProjectReviewDo {
	return p.withDO(p.DO.Offset(offset))
}

func (p projectReviewDo) Scopes(funcs ...func(gen.Dao) gen.Dao) IProjectReviewDo {
	return p.withDO(p.DO.Scopes(funcs...))
}

func (p projectReviewDo) Unscoped() IProjectReviewDo {
	return p.withDO(p.DO.Unscoped())
}

func (p projectReviewDo) Create(values ...*model.ProjectReview) error {
	if len(values) == 0 {
		return nil
	}
	return p.DO.Create(values)
}

func (p projectReviewDo) CreateInBatches(values []*model.ProjectReview, batchSize int) error {
	return p.DO.CreateInBatches(values, batchSize)
}

// Save : !!! underlying implementation is different with GORM
// The method is equivalent to executing the statement: db.Clauses(clause.OnConflict{UpdateAll: true}).Create(values)
func (p projectReviewDo) Save(values ...*model.ProjectReview) error {
	if len(values) == 0 {
		return nil
	}
	return p.DO.Save(values)
}

func (p projectReviewDo) First() (*model.ProjectReview, error) {
	if result, err := p.DO.First(); err != nil {
		return nil, err
	} else {
		return result.(*model.ProjectReview), nil
	}
}

func (p projectReviewDo) Take() (*model.ProjectReview, error) {
	if result, err := p.DO.Take(); err != nil {
		return nil, err
	} else {
		return result.(*model.ProjectReview), nil
	}
}

func (p projectReviewDo) Last() (*model.ProjectReview, error) {
	if result, err := p.DO.Last(); err != nil {
		return nil, err
	} else {
		return result.(*model.ProjectReview), nil
	}
}

func (p projectReviewDo) Find() ([]*model.ProjectReview, error) {
	result, err := p.DO.Find()
	return result.([]*model.ProjectReview), err
}

func (p projectReviewDo) FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.ProjectReview, err error) {
	buf := make([]*model.ProjectReview, 0, batchSize)
	err = p.DO.FindInBatches(&buf, batchSize, func(tx gen.Dao, batch int) error {
		defer func() { results = append(results, buf...) }()
		return fc(tx, batch)
	})
	return results, err
}

func (p projectReviewDo) FindInBatches(result *[]*model.ProjectReview, batchSize int, fc func(tx gen.Dao, batch int) error) error {
	return p.DO.FindInBatches(result, batchSize, fc)
}

func (p projectReviewDo) Attrs(attrs ...field.AssignExpr) IProjectReviewDo {
	return p.withDO(p.DO.Attrs(attrs...))
}

func (p projectReviewDo) Assign(attrs ...field.AssignExpr) IProjectReviewDo {
	return p.withDO(p.DO.Assign(attrs...))
}

func (p projectReviewDo) Joins(fields ...field.RelationField) IProjectReviewDo {
	for _, _f := range fields {
		p = *p.withDO(p.DO.Joins(_f))
	}
	return &p
}

func (p projectReviewDo) Preload(fields ...field.RelationField) IProjectReviewDo {
	for _, _f := range fields {
		p = *p.withDO(p.DO.Preload(_f))
	}
	return &p
}

func (p projectReviewDo) FirstOrInit() (*model.ProjectReview, error) {
	if result, err := p.DO.FirstOrInit(); err != nil {
		return nil, err
	} else {
		return result.(*model.ProjectReview), nil
	}
}

func (p projectReviewDo) FirstOrCreate() (*model.ProjectReview, error) {
	if result, err := p.DO.FirstOrCreate(); err != nil {
		return nil, err
	} else {
		return result.(*model.ProjectReview), nil
	}
}

func (p projectReviewDo) FindByPage(offset int, limit int) (result []*model.ProjectReview, count int64, err error) {
	result, err = p.Offset(offset).Limit(limit).Find()
	if err != nil {
		return
	}

	if size := len(result); 0 < limit && 0 < size && size < limit {
		count = int64(size + offset)
		return
	}

	count, err = p.Offset(-1).Limit(-1).Count()
	return
}

func (p projectReviewDo) ScanByPage(result interface{}, offset int, limit int) (count int64, err error) {
	count, err = p.Count()
	if err != nil {
		return
	}

	err = p.Offset(offset).Limit(limit).Scan(result)
	return
}

func (p projectReviewDo) Scan(result interface{}) (err error) {
	return p.DO.Scan(result)
}

func (p projectReviewDo) Delete(models ...*model.ProjectReview) (result gen.ResultInfo, err error) {
	return p.DO.Delete(models)
}

func (p *projectReviewDo) withDO(do gen.Dao) *projectReviewDo {
	p.DO = *do.(*gen.DO)
	return p
}
